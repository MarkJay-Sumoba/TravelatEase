const { Tours, Reviews, Users } = require("../models/");

const crypto = require("crypto");
const sharp = require("sharp");
const dotenv = require("dotenv");
dotenv.config();

// S3 Connection
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});


// For random Image name to avoid duplicates
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

module.exports = {
  /* Create a tour */
  createTour: async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    // Resize image when stored in S3
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 667, width: 1000, fit: "contain" })
      .toBuffer();

    const imageName = randomImageName();

    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: imageName,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      // Upload image to S3
      await s3Client.send(command);

      // Create a new tour in the database
      const createTour = await Tours.create({
        title: req.body.title,
        price: req.body.price,
        availability: req.body.availability,
        region: req.body.region,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        tourDate: req.body.tourDate,
        description: req.body.description,
        image: imageName,
      });

      res.json(createTour);
    } catch (error) {
      console.error("S3 upload error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /* View all the tours */
  getTours: async (req, res) => {
    try {
      const getTours = await Tours.findAll({
        order: [["createdAt", "DESC"]],
      });

      // Use Promise.all to handle asynchronous operations
      const toursWithUrls = await Promise.all(
        getTours.map(async (tour) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: tour.image,
          };

          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 60 * 60 * 24,
          });

          return {
            ...tour.dataValues,
            imageUrl: url, // Remember to have the src={imageUrl} on client end
          };
        })
      );

      res.json(toursWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /* View a specific tour with reviews */
  getTourById: async (req, res) => {
    const id = +req.params.id;

    try {
      const tour = await Tours.findByPk(id, {
        include: [
          {
            model: Reviews,
            as: "tourReviews",
            include: [
              {
                model: Users,
                as: "reviewUser",
              },
            ],
          },
        ],
      });

      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      const getObjectParams = {
        Bucket: bucketName,
        Key: tour.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 60 * 60 * 24,
      });

      // Return an object with tour details, imageUrl, and reviews
      const tourWithReviews = {
        ...tour.dataValues,
        imageUrl: url,
      };

      res.json(tourWithReviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /* Update a tour */
  /* MS Version */
  updateTour: async (req, res) => {
    const id = +req.params.id;

    console.log("================");
    console.log("req.body", req.body);

    try {
      const tour = await Tours.findByPk(id);

      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      // Check if there's a file in the request
      if (req.file) {
        // Resize image when stored in S3
        const buffer = await sharp(req.file.buffer)
          .resize({ height: 667, width: 1000, fit: "contain" })
          .toBuffer();

        // Delete the existing image from S3
        const deleteParams = {
          Bucket: bucketName,
          Key: tour.image,
        };
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await s3Client.send(deleteCommand);

        // Upload the new image to S3
        const imageName = randomImageName();
        const uploadParams = {
          Bucket: bucketName,
          Body: buffer,
          Key: imageName,
          ContentType: req.file.mimetype,
        };
        const uploadCommand = new PutObjectCommand(uploadParams);
        await s3Client.send(uploadCommand);

        // Update the tour with the new image name
        tour.image = imageName;
      }

      // Update other tour fields
      tour.title = req.body.title || tour.title;
      tour.price = req.body.price || tour.price;
      tour.availability = req.body.availability || tour.availability;
      tour.region = req.body.region || tour.region;
      tour.country = req.body.country || tour.country;
      tour.city = req.body.city || tour.city;
      tour.address = req.body.address || tour.address;
      tour.tourDate = req.body.tourDate || tour.tourDate;
      tour.description = req.body.description || tour.description;

      // Save the updated tour to the database
      await tour.save();

      res.json(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /* Delete a tour */
  deleteTour: async (req, res) => {
    const id = +req.params.id;

    try {
      const tour = await Tours.findByPk(id);

      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      // const params = {
      //   Bucket: bucketName,
      //   Key: tour.image,
      // };

      // const command = new DeleteObjectCommand(params);

      // Delete the associated file
      // await s3Client.send(command);

      // Delete the tour
      await Tours.destroy({ where: { tourID: id } });

      res.send(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
