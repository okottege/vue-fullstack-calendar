import Vue from 'vue';
import { seedData } from './seed';

export const store = {
  state: {
    seedData
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEvent(dayId, eventDetails);
    eventObj.edit = true;
  },
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEvent(dayId, originalEventDetails);
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find(d => d.id === dayId);
    const eventIndex = dayObj.events.findIndex(e => e.details === eventDetails);
    dayObj.events.splice(eventIndex, 1);
  },
  getEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find(day => day.id === dayId);
    return dayObj.events.find(e => e.details === eventDetails);
  },
  getActiveDay() {
    return this.state.seedData.find(day => day.active);
  },
  setActiveDay(dayId) {
    this.state.seedData.map(day => {
      day.active = day.id === dayId;
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ 'details': eventDetails, 'edit': false });
  },
  resetEditOfAllEvents() {
    this.state.seedData.map(day => {
      day.events.map(e => {
        e.edit = false;
      });
    });
  }
};
