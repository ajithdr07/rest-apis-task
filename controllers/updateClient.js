import agencyModel from "../models/agency.js";
import clientModel from "../models/client.js";

const updateClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const updates = req.body;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }
    const isValidClientId = await clientModel.exists({ _id: clientId });
    if (!isValidClientId) {
      return res.status(404).json({ error: "Invalid client ID" });
    }

    if (updates.agencyId) {
      const isValidAgency = await agencyModel.exists({ _id: updates.agencyId });
      if (!isValidAgency) {
        return res.status(400).json({ error: "Invalid agencyId" });
      }
    }

    const updatedClient = await clientModel.findByIdAndUpdate(
      clientId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default updateClient;
