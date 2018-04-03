import Vue from 'vue';
import { seedData } from './seed';

export const store = {
  state: {
    seedData
  },
  editEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find(day => day.id === dayId);
    const eventObj = dayObj.events.find(e => e.details === eventDetails);
    eventObj.edit = true;
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
