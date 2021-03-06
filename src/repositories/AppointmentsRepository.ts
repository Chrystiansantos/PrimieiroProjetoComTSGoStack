import { isEqual } from "date-fns";
import Appointment from "../models/Apointment";

// REPOSITORY CONSISTE NA MANIPULACAO DO DADO

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment: Appointment) =>
      isEqual(date, appointment.date)
    );
    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment: Appointment = new Appointment(provider, date);
    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
