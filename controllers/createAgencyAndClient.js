import agencyModel from "../models/agency.js";
import clientModel from "../models/client.js";

const createAgencyAndClient = async (req, res) => {
  try {
    const { agency, clients } = req.body;

    const existingAgency = await agencyModel.findOne({ name: agency.name });
    if (existingAgency) {
      return res.status(400).json({ error: "Agency name already exists" });
    }

    const existingPhoneNumber = await agencyModel.findOne({
      phoneNumber: agency.phoneNumber,
    });
    if (existingPhoneNumber) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    const createdAgency = await agencyModel.create(agency);

    if (!clients) {
      return res.status(200).json({ agency: createdAgency, clients: [] });
    }

    const clientsValidation = await Promise.all(
      clients.map(async (client) => {
        client.agencyId = createdAgency._id;
        try {
          const clientValidation = await clientModel.validate(client);
          if (clientValidation.error) {
            throw new Error(
              `Client validation error: ${clientValidation.error.message}`
            );
          }
          return clientModel.create(client);
        } catch (error) {
          throw new Error(`Client validation error: ${error.message}`);
        }
      })
    );

    res.status(201).json({ agency: createdAgency, clients: clientsValidation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default createAgencyAndClient;
