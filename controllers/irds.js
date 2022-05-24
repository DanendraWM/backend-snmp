import Ird from "../models/irdModel.js"


export const getAllIrds = async (req, res) => {
    const irds = await Ird.findAll();
    res.json(irds);
}

export const getIrdById = async (req, res) => {
    const ird = await Ird.findAll({
        where: {
            id: req.params.id
        }
    });
    res.json(ird[0]);
}