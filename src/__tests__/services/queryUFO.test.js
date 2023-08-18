const db = require('../../models/db')
const queryUFO = require('../../services/queryUFO');

// Use jest.mock() to create a mock version of my db
jest.mock('../../models/db')

it('testing to make sure services query builder is working', async () => {
    const location = {
        country: 'USA',
        city: 'Los Angeles',
      };

      const dateOfOccurrence = '17/21/23'

      // Arrange: Mock the methods used in queryBuilder
    const mockWhereIn = jest.fn().mockReturnThis();
    const mockTable = jest.fn().mockReturnValue({
        whereIn: mockWhereIn,
    });
    
    // Set up the db object to return mock methods
    db.select.mockReturnValue({
        table: mockTable,
    });

    // Mock the db with sampledata
    const sampleData = [
        {
            "id": 91,
            "city": "Los Angeles",
            "state": "CA",
            "country": "USA",
            "shape": "Light",
            "reported_date": "7/29/23",
            "incident_date": "7/21/23",
            "duration": "15 Minutes",
            "summary": "10 to 15 glowing lights changing color at high altitude.",
            "images": "No"
        }
    ]
    db.mockResolvedValue(sampleData)

    // Call the controller function
    // await queryUFO(location, dateOfOccurrence);

    // Check if the response methods were called as expected
    await queryUFO(location, dateOfOccurrence)

    expect(db.select).toHaveBeenCalled();
    expect(mockTable).toHaveBeenCalledWith('ufo');
    expect(mockWhereIn).toHaveBeenCalledWith("incident_date", "17/21/23")
    expect(mockWhereIn).toHaveBeenCalledWith("city", "Los Angeles")
    expect(mockWhereIn).toHaveBeenCalledWith("country", "USA")
  });