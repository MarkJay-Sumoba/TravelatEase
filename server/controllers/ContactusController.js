const { ContactUs } = require("../models");

module.exports = {
  // User can contact us
  createContactUs: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const newContact = await ContactUs.create({ name, email, message });
      res.status(201).json(newContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
