const axios = require('axios');
const chatController = require('../src/controllers/chatMessage');

jest.mock('axios');
axios.get.mockResolvedValue({ status: 200, data: { userId: '1234567890' } });


describe("Send Message", () => {
  it("should create a new message", async () => {
    try {
      const req = {
        headers: {
          authorization: "Bearer token123",
        },
        body: {
          receiverId: "9876543210",
          messageContent: "Test message",
        },
        app: {
          locals: {
            wss: {
              clients: [],
            },
          },
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await chatController.sendMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("Message sent successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

});

/*describe('getChatHistory function', () => {
    test('should retrieve chat history successfully', async () => {
      const req = {
        headers: {
          authorization: 'Bearer token123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      try {
        await chatController.getChatHistory(req, res);
      } catch (error) {
        console.error('Error in getChatHistory test:', error);
      }
  
      expect(res.status).toHaveBeenCalledWith(200);
    
    });
  });*/