import { startOfHour } from "date-fns";
import Appointment from "../models/Apointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/*  */
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw Error("This appointment is alread booked");

    const appointment = this.appointmentsRepository.create(
      provider,
      appointmentDate
    );

    return appointment;
  }
}

export default CreateAppointmentService;
