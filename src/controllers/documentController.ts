import { Request, Response } from "express";
import Document, { IDocument } from "../models/documentModel";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
    }
    const pdfUrl = `/uploads/${req.file?.filename}`;

    const document: IDocument = new Document({ pdfUrl });
    await document.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document: document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePlaceholders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { placeholders } = req.body;
    const document = await Document.findByIdAndUpdate(
      id,
      { placeholders },
      { new: true }
    );

    if (!document) res.status(404).json({ message: "Document not found" });

    res.status(200).json({
      message: "Placeholders updated successfully",
      document: document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fillAndSign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let signatureUrl: string | null = null;
    if (req.file) {
      signatureUrl = `/uploads/${req.file.filename}`;
    }
    const updateData: Partial<IDocument> = { name };
    if (signatureUrl) updateData.signatureUrl = signatureUrl;

    const document = await Document.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!document) res.status(404).json({ message: "Document not found" });

    res.status(200).json({
      message: "Fill and Sign uploaded successfully",
      document: document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDocuments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const documents = await Document.find();

    res.status(200).json({
      message: "Documents fetched successfully",
      documents: documents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSignedDocuments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Return only documents with both name and signatureUrl
    const documents = await Document.find({
      name: { $exists: true, $ne: null },
      signatureUrl: { $exists: true, $ne: null },
    });
    res.status(200).json({
      message: "Signed documents fetched successfully",
      documents: documents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
