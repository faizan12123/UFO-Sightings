const getUFO = require("../../controllers/getUFO");
const queryUFO = require("../../services/queryUFO");

// Use jest.mock() to create a mock version of my services
jest.mock("../../services/queryUFO");

it("should send status code of 400 when dateOfOccurrence does not match date format", async () => {
  const req = {
    query: {
      dateOfOccurrence: "7/21/223,7/17/233",
      country: "USA",
      city: "Los Angeles,Irvine,New York,Austin,Dallas,dallas,austin",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  await getUFO(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith({ error: "Invalid date format." });
});

it("should respond with UFO data when valid query parameters are provided", async () => {
  const req = {
    query: {
      dateOfOccurrence: "7/21/23,7/17/23",
      country: "USA",
      city: "Los Angeles",
    },
  };

  const res = {
    json: jest.fn(),
  };

  const sampleData = [
    {
      id: 91,
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      shape: "Light",
      reported_date: "7/29/23",
      incident_date: "7/21/23",
      duration: "15 Minutes",
      summary: "10 to 15 glowing lights changing color at high altitude.",
      images: "No",
    },
  ];

  // Mock the queryUFO function to return sample data
  queryUFO.mockResolvedValue(sampleData);

  // Call the controller function
  await getUFO(req, res);

  // Check if the response methods were called as expected
  expect(res.json).toHaveBeenCalled();
  expect(res.json).toHaveBeenCalledWith(sampleData);
});

it("should respond with no results matching the request due to service being mocked with empty array", async () => {
  const req = {
    query: {
      dateOfOccurrence: "17/21/23",
      country: "USA",
      city: "Los Angeles",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  const sampleData = [];

  // Mock the queryUFO function to return sample data
  queryUFO.mockResolvedValue(sampleData);

  // Call the controller function
  await getUFO(req, res);

  // Check if the response methods were called as expected
  expect(res.json).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "No results matching this search",
  });
});

it("should respond with an internal server error when mocking the service with an error", async () => {
  const req = {
    query: {
      dateOfOccurrence: "17/21/23",
      country: "USA",
      city: "Los Angeles",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  // Mock the queryUFO function to throw an error when called
  queryUFO.mockImplementation(() => {
    throw new Error("Simulated server error");
  });

  // Call the controller function
  await getUFO(req, res);

  // Check if the response methods were called as expected
  expect(res.json).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
});
