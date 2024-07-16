import Url from "../models/url";
import { formatDate } from "../utils/formatDate";

export class UrlController {
    static async getUrls(req, res) {
        try {
            const googleId = req.headers['x-google-id'];

            const urls = await Url.findByGoogleId(googleId);

            res.status(200).json(urls);
        } catch (err) {
            throw err;
        }
    }
    static async getUrlById(req, res) {
        try {
            const { id } = req.params;

            const url = await Url.findById(id);

            if (!url) {
                return res.status(404).json({ message: 'URL no encontrada' });
            }

            return res.status(200).json(url);
        } catch (error) {
            return res.status(500).json({ message: 'Error del servidor', error });
        }

    }
    static async createUrl(req, res) {
        try {
            const { googleId, url } = req.body;

            if (!googleId) {
                return res.status(400).json({ error: 'Faltas datos en la peticion' });
            }

            const isValid = await Url.isValidUrl(url);

            if (!isValid) {
                return res.status(400).json({ error: 'La URL proporcionada no es válida' });
            }

            const short = await Url.generateShortUrl();

            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);

            const newUrl = new Url(googleId, "Active", url, short, 0, formattedDate);
            const result = await Url.createUrl(newUrl);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    static async deleteUrl(req, res) {
        try {
            const id = req.headers['x-url-id'];

            const deleteUrl = await Url.deleteById(id);

            if (!deleteUrl) {
                return res.status(404).json({ message: 'No se encontro el documento' });
            }

            res.json(deleteUrl);
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la url', error });
        }
    }
    static async updateUrl(req, res) {
        try {
            const id = req.headers['x-url-id'];
            const { url, status, shortUrl, googleId, date, clicks } = req.body;

            const newUrl = new Url(googleId, status, url, shortUrl, clicks, date);

            const updatedUrl = await Url.findByIdAndUpdate(id, newUrl);

            if (!updatedUrl) {
                return res.status(404).json({ message: 'Url no encontrado' });
            }

            res.json(updatedUrl);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la url', error });
        }
    }
}

