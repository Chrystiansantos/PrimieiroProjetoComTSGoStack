import { Router, Response, Request } from "express";

import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../Service/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Rota, se responsaviliza apenas por Receber uma requisicao,
//  Chamar um arquivo pra tratar deolver uam resposta

appointmentsRouter.post("/", (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get("/", (req: Request, res: Response) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

export default appointmentsRouter;
