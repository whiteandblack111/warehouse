const uuid = require('uuid');

const { Persona } = require('../models/models');
const { Photo } = require('../models/models');
const { Role } = require('../models/models');
const { Postupok } = require('../models/models');
const { Postupok_photo } = require('../models/models');
const ApiError = require("../error/ApiError");
const { createPath, uploadFile } = require('../services/FotoUploader');

const { where } = require('sequelize');
const { model } = require('../db');

class Persona_Controller {

    async publication(req, res, next) {
        try {
            const {
                firstname,
                twoname,
                threename,
                role,
                postupok_description

            } = req.body;


            const persona = await Persona.create({
                firstname,
                twoname,
                threename,
                role,

            });

            const postupok = await Postupok.create({

                title: "asdasdasd",
                description: "postupok_description",
                personaId: persona.id
            });



            for (const file in req.files) {
                if (file === "persona_photo") {

                    const fileFoto = req.files[file]


                    const filePath = createPath('persona');
                    const fileName = uploadFile(filePath, fileFoto)

                    await Photo.create({
                        isAvatar: true,
                        img_path: filePath,
                        img_name: fileName,
                        personaId: persona.id
                    });

                }else{

                    const fileFoto = req.files[file]
                    const filePath = createPath("postupok");
                    const fileName = uploadFile(filePath, fileFoto)
                    await Postupok_photo.create({
                        isAvatar: false,
                        img_path: filePath,
                        img_name: fileName,
                        postupokId: postupok.id
                    });
                }
            }



            return res.json(true);
        } catch (e) {
            next(ApiError.bad_Request(e.message));
        }

    }


    async getAll(req, res, next) {

        try {
            let { role, limit, page } = req.query;

            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            let personas;

            if (role) {
                personas = await Persona.findAndCountAll({ where: { role_ID: role }, limit, offset })
            }


            return res.json(personas);
        } catch (e) {
            next(ApiError.bad_Request(e.message))
        }


    }


    async getOne(req, res, next) {
        try {
            const { id } = req.query

            const persona = await Persona.findOne({
                where: id ,
                include: [
                    { model: Photo, as: 'photos' },
                    {
                        model: Postupok,
                        as: "postupoks",
                        include: [
                            { 
                                model: Postupok_photo, as: "postupok_photos" 

                            }]
                    }
                ]
            })

            return res.json(persona)

        } catch (e) {
            return next(ApiError.bad_Request(e.message))
        }

    }
}

module.exports = new Persona_Controller()