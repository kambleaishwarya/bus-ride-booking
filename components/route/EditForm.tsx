import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditRouteForm = () => {
  const [route, setRoute] = useState({
    id: "",
    name: "",
    description: "",
  });
  const { routeId } = useParams();
  const navigate = useNavigate();

  // Fetch the route data from API
  const fetchRoute = async (routeId) => {
    try {
      const response = await fetch(`/api/routes/${routeId}`);
      const data = await response.json();
      setRoute(data);  // Ensure you're setting only the needed data.
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (routeId) {
      fetchRoute(routeId);  // Fetch route if routeId is available
    }
  }, [routeId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data (ensure you only submit needed data)
    console.log("Submitting route:", route);
    // Call API to update the route if needed
  };

  return (
    <div className="container">
      <h2>Edit Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Route Name</label>
          <input
            type="text"
            id="name"
            value={route.name || ""}  // Ensure that `route.name` exists and is a string
            onChange={(e) => setRoute({ ...route, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Route Description</label>
          <input
            type="text"
            id="description"
            value={route.description || ""}  // Same for description
            onChange={(e) => setRoute({ ...route, description: e.target.value })}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditRouteForm;
