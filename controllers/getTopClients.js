import clientModel from "../models/client.js";

const getTopClients = async (req, res) => {
  try {
    const maxTotalBill = await clientModel.find().sort("-totalBill").limit(1);

    if (maxTotalBill.length === 0) {
      return res.status(200).json([]);
    }

    const topClients = await clientModel
      .find({
        totalBill: maxTotalBill[0].totalBill,
      })
      .populate("agencyId");

    if (topClients.length === 0) {
      return res.status(200).json([]);
    }

    const response = topClients.map((client) => ({
      agencyName: client.agencyId.name,
      clientName: client.name,
      totalBill: client.totalBill,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default getTopClients;
