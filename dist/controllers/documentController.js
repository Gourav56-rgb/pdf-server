"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedDocuments = exports.getDocuments = exports.fillAndSign = exports.updatePlaceholders = exports.uploadDocument = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
const uploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
        }
        const pdfUrl = `/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        const document = new documentModel_1.default({ pdfUrl });
        yield document.save();
        res.status(201).json({
            message: "Document uploaded successfully",
            document: document,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.uploadDocument = uploadDocument;
const updatePlaceholders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { placeholders } = req.body;
        const document = yield documentModel_1.default.findByIdAndUpdate(id, { placeholders }, { new: true });
        if (!document)
            res.status(404).json({ message: "Document not found" });
        res.status(200).json({
            message: "Placeholders updated successfully",
            document: document,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updatePlaceholders = updatePlaceholders;
const fillAndSign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        let signatureUrl = null;
        if (req.file) {
            signatureUrl = `/uploads/${req.file.filename}`;
        }
        const updateData = { name };
        if (signatureUrl)
            updateData.signatureUrl = signatureUrl;
        const document = yield documentModel_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!document)
            res.status(404).json({ message: "Document not found" });
        res.status(200).json({
            message: "Fill and Sign uploaded successfully",
            document: document,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.fillAndSign = fillAndSign;
const getDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield documentModel_1.default.find();
        res.status(200).json({
            message: "Documents fetched successfully",
            documents: documents,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getDocuments = getDocuments;
const getSignedDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Return only documents with both name and signatureUrl
        const documents = yield documentModel_1.default.find({
            name: { $exists: true, $ne: null },
            signatureUrl: { $exists: true, $ne: null },
        });
        res.status(200).json({
            message: "Signed documents fetched successfully",
            documents: documents,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getSignedDocuments = getSignedDocuments;
