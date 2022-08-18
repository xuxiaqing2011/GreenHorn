import React, { useContext } from 'react';
import { AllContext } from "../index.jsx";
// Refer to the JavaScript quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/js
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.
// SET UP GOOGLE ENVIRONMENT
var gapi = window.gapi;
var CLIENT_ID = "288705266674-tj7qlfqv02t9r6jqi8opqbv6c5fmhurd.apps.googleusercontent.com"; //ANCHOR Add CLIENT ID
var API_KEY = "[API_KEY]"; //ANCHOR Add API Key
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
//const { email } = useContext(AllContext);
const email = '[EMAIL]'

const sendInvite = function (data) {
  // SIGNS USER IN EACH TIME -- LETS THEM SELECT CALENDAR
  gapi.load("client:auth2", () => {
    console.log("loaded client");
    window.gapi.client
      .init({
        clientId: CLIENT_ID,
        apiKey: API_KEY,
        scope: SCOPES,
        discoveryDocs: DISCOVERY_DOCS,
        plugin_name: "GreenHorn",
      })
      .then(() => {
        return gapi.client.request({
          path: "https://www.googleapis.com/auth/calendar",
          headers: { "Content-Type": "application/json" },
        });
      });
    // LOADS CALENDAR DATA
    gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        var event = {
          summary: "Interview Invitation",
          location: data.inviteInfo.location,
          description: data.inviteInfo.description,
          start: {
            dateTime:
              data.inviteInfo.startDate +
              "T" +
              data.inviteInfo.startTime +
              ":00-05:00",
            timeZone: "America/Chicago",
          },
          end: {
            dateTime:
              data.inviteInfo.endDate +
              "T" +
              data.inviteInfo.endTime +
              ":00-05:00",
            timeZone: "America/Chicago",
          },
          attendees: [
            { email: [email] }, //ANCHOR Add email
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
          sendUpdates: "all",
        };

        var request = gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
          sendNotifications: true,
        });

        request.execute(function (event) {
          console.log(event.data);
          console.log("Event created: " + event.htmlLink);
        });
      });
  });
};
export default sendInvite;
