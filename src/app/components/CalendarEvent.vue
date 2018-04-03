<template>
  <div class="day-event" :style="getEventBackgroundColour">
    <div v-if="!event.edit">
      <span class="has-text-centered details">{{ event.details }}</span>
      <div class="has-text-centered icons">
        <i class="fa fa-pencil-square edit-icon" @click="editEvent(day.id, event.details)"></i>
        <i class="fa fa-trash-o delete-icon"></i>
      </div>
    </div>
    <div v-if="event.edit">
      <input type="text" :placeholder="event.details" v-model="newEventDetails"/>
      <div class="has-text-centered icons">
        <i class="fa fa-check" @click="updateEvent(day.id, event.details, newEventDetails)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';

export default {
  name: 'CalendarEvent',
  props: ['event', 'day'],
  data() {
    return {
      newEventDetails: ''
    }
  },
  methods: {
    editEvent(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails);
    },
    updateEvent(dayId, originalEventDetails, updatedEventDetails) {
      if(updatedEventDetails === '') {
        updatedEventDetails = originalEventDetails;
      }
      store.updateEvent(dayId, originalEventDetails, updatedEventDetails);
      this.newEventDetails = '';
    }
  },
  computed: {
    getEventBackgroundColour() {
      const colours = ['#FF9999', '#85D6FF', '#99FF99'];
      let randomColour = colours[Math.floor(Math.random() * colours.length)];
      return `background-color: ${randomColour}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;

  .details {
    display: block;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #FFF;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>

