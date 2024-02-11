// Admin.js
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SideBar from "./components/SideBar";
import "./styles/Admin.css";

const Admin = () => {
  const [tours, setTours] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tourIdToDelete, setTourIdToDelete] = useState(null);

  // Retrieve tours from DB
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://localhost:3001/api/tours");
        console.log("Response:", response);

        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  // Function to toggle the delete confirmation modal
  const toggleDeleteModal = (tourId) => {
    setTourIdToDelete(tourId);
    setDeleteModal(!deleteModal);
  };

  // Function to handle tour deletion
  const onDelete = async (id) => {
    console.log("Deleting tour with id:", id);

    try {
      // Send a request to delete the tour
      await axios.delete(`https://localhost:3001/api/delete-tour/${id}`);
      console.log("Tour deleted successfully!");

      // Remove the deleted tour from the local state
      setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));

      // Close the delete confirmation modal
      setDeleteModal(false);
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  return (
    <Row>
      <Col lg="3">
        <SideBar />
      </Col>
      <Col lg="8">
        <div className="d-flex justify-content-between align-items-center my-5">
          <h1 className="tour_management">Tours</h1>
          <Link to={"/manage/create-tours"} className="btn primary_btn">
            Create Tour
          </Link>
        </div>
        <div className="tours_content">
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Picture</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={index}>
                  <td>{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>
                    <img
                      src={tour.imageUrl}
                      alt={tour.title}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  </td>
                  <td>{tour.price}</td>
                  <td>
                    <Link
                      to={`/tours/${tour.tourID}`}
                      className="btn btn-primary mx-2"
                    >
                      View
                    </Link>
                    {console.log("checking tourID deliverd :", tour.tourID)}
                    <Link
                      to={`/manage/update-tours/${tour.tourID}`}
                      className="btn btn-warning mx-2"
                    >
                      Update
                    </Link>
                    <Button
                      type="submit"
                      onClick={() => toggleDeleteModal(tour.tourID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        {console.log("deleteModal status:", deleteModal)}
        {console.log("tourID :", tourIdToDelete)}
        <ModalHeader toggle={toggleDeleteModal}>Confirm Deletion</ModalHeader>
        <ModalBody>Are you sure you want to delete this tour?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onDelete(tourIdToDelete)}>
            Yes, Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default Admin;
