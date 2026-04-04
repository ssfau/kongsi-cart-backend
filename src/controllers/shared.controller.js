import { Payment, User } from "../models.js";

export const getPaymentHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ status: "error", error: "Unauthorized" });
    }

    const payments = await Payment.find({ userId })
      .sort({ processedAt: -1 })
      .lean();

    const formattedPayments = payments.map((param) => ({
      id: param._id,
      timestamp: param.processedAt,
      total: param.amount,
      method: param.method === 'online_placeholder' ? 'Online Transfer' : param.method,
      status: param.status,
    }));

    res.status(200).json({ status: "success", data: formattedPayments });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
};
