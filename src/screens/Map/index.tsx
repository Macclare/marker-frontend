import { useState, useEffect } from "react";
import { InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import { AddMarkerReq } from "../../types";
import { toast } from "sonner";
import { addNewMarker, GetAllMarkers } from "../../api/marker-api";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

interface DataItem {
  millName: string;
  latitude: number;
  longitude: number;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: string;
}

const Index = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<DataItem | null>(
    null
  );

  const [newMarker, setNewMarker] = useState<AddMarkerReq>({
    millName: "",
    latitude: 0,
    longitude: 0,
    p1Amount: 0,
    numTransactions: 0,
    p1PriceTon: 0,
    lastTransactionDate: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  // Function to determine color based on transaction date
  const getStatusColor = (lastTransactionDate: string): string => {
    const transactionDate = dayjs(lastTransactionDate);
    const today = dayjs();
    const daysAgo = today.diff(transactionDate, "day");

    if (daysAgo <= 7) return "green"; // Recent (within the last week)
    if (daysAgo <= 14) return "yellow"; // Older than one week
    return "red"; // Older than two weeks
  };

  // Fetch markers from the API
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const markers = await GetAllMarkers();
        setData(markers);
      } catch (error) {
        toast.error("Failed to fetch markers. Please try again.");
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, []);

  const handleMarkerClick = (location: DataItem) => {
    setSelectedLocation(location);
  };

  const handleInfoWindowClose = () => {
    setSelectedLocation(null);
  };

  //The function that handles the input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMarker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
//This is the function that makes the api call for adding new markers
  const handleAddMarker = async () => {
    if (
      !newMarker.millName ||
      !newMarker.latitude ||
      !newMarker.longitude ||
      !newMarker.p1Amount ||
      !newMarker.numTransactions ||
      !newMarker.p1PriceTon ||
      !newMarker.lastTransactionDate
    ) {
      toast.error("Please fill out all fields before adding the marker.");
      return;
    }

    try {
      const response = await addNewMarker(newMarker);
      if (response) {
        setData((prevData) => [...prevData, response]);
        setShowPopup(false);
        setNewMarker({
          millName: "",
          latitude: 0,
          longitude: 0,
          p1Amount: 0,
          numTransactions: 0,
          p1PriceTon: 0,
          lastTransactionDate: "",
        });
        toast.success("New marker added successfully!");
      }
    } catch (error) {
      toast.error("There was an error adding the marker. Please try again.");
      console.error("Error adding marker:", error);
    }
  };

  return (
    <div className="flex w-full h-screen border border-black rounded-sm relative">
      <div className="relative flex-1">
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={{ lat: 5.587366, lng: 8.133794 }}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {data.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Marker Details</h3>
                <p>
                  <strong>Mill Name:</strong> {selectedLocation.millName}
                </p>
                <p>
                  <strong>Latitude:</strong> {selectedLocation.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {selectedLocation.longitude}
                </p>
                <p>
                  <strong>Amount:</strong> {selectedLocation.p1Amount}
                </p>
                <p>
                  <strong>Transactions:</strong>{" "}
                  {selectedLocation.numTransactions}
                </p>
                <p>
                  <strong>Price per Ton:</strong> {selectedLocation.p1PriceTon}
                </p>
                <p className="mb-1">
                  <strong>Last Transaction:</strong>{" "}
                  {dayjs(selectedLocation.lastTransactionDate).format(
                    "DD MMM YYYY"
                  )}
                </p>
                <div className="flex items-center mt-2">
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 w-3 h-3 rounded-full`}
                    style={{
                      backgroundColor: getStatusColor(
                        selectedLocation.lastTransactionDate
                      ),
                    }}
                  />
                </div>
              </div>
            </InfoWindow>
          )}
          {/* This is the popup card for adding new markers */}
          {showPopup && (
            <Dialog
              open={showPopup}
              onClose={() => setShowPopup(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle sx={{ textAlign: "center" }}>
                Add New Marker
              </DialogTitle>
              <DialogContent>
                <form>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Mill Name"
                      name="millName"
                      value={newMarker.millName}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Latitude"
                      type="number"
                      name="latitude"
                      value={newMarker.latitude}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Longitude"
                      type="number"
                      name="longitude"
                      value={newMarker.longitude}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      name="p1Amount"
                      value={newMarker.p1Amount}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Number of Transactions"
                      type="number"
                      name="numTransactions"
                      value={newMarker.numTransactions}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Price per Ton"
                      type="number"
                      name="p1PriceTon"
                      value={newMarker.p1PriceTon}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      color="success"
                    />
                  </div>
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Last Transaction Date"
                      type="date"
                      name="lastTransactionDate"
                      value={newMarker.lastTransactionDate}
                      onChange={handleInputChange}
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      color="success"
                    />
                  </div>
                </form>
                <Button
                  onClick={handleAddMarker}
                  variant="contained"
                  color="success"
                  fullWidth
                  style={{
                    marginTop: "16px",
                  }}
                >
                  Add Marker
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </Map>
      </div>
      <button
        onClick={() => setShowPopup(true)}
        className="absolute bottom-16 right-10 px-8 py-4 bg-white text-[#31511E] rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Add New Marker
      </button>
    </div>
  );
};

export default Index;
