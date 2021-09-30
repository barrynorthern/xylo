<img src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f485.svg" width="50" height="50" />

# XYLO

Xylo is a therapy product, users book therapy through Xylo. Users often have requirements about how they can book therapy, eg counsellor specialism.

The challenge is to build a booking page that takes into account several different filters.

**User requirements**

- as a user I can view all upcoming appointments
- as a user I can see a single page per appointment type (one-off, consultation)
- as a user I can filter based on (counsellor specialisms, medium)
- as a user I can't see duplicate appointment times even if more than one therapist is available at that time
- as a user the UI should be simple and easy to understand
- as a user I can select the appointment time I want to book
- as a user I can see a confirmation screen of my booking

 

**Technical Requirements**

- build it using React - other technical choices and libraries are up to you
- written in TypeScript (or JavaScript)
- the site should be hosted

**Things to think about**

- separation of concerns
- component reusability
- responsiveness
- design and UX

**Assumptions**

- appointments last an hour

**Xylo colours**

- teal `#35D0BA`
- blue `#041549`
- gray `#F3F4F6`
- dark gray `#374151`

*you can use other colours - this isn't our entire colour palette, but could be a good starting point*

We are not exposing an actual API for this exercise. Please use these JSON files as your data. When booking an appointment mock the logic. Please treat this in a similar way to how you would expect to work with an API.

The data is split into files: a counsellors array that contains all counsellors and their specialisms, and availability, that is normalised by counsellor id.

[counsellor-mock.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a7137d0-871f-4561-a243-137b81c91222/counsellor-mock.json)

[availability-mock.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b8e5ecb4-f685-4292-9296-e6f311dd7ebe/availability-mock.json)

## Development Resources

* https://mherman.org/blog/dockerizing-a-react-app/
* https://tailwindcss.com/docs/guides/create-react-app