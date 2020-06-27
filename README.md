# Full stack message board
### Following along with CodeGardens Newby Tuesday (https://www.youtube.com/watch?v=2xIoWm08SBM)
---
* [x] Create server folder
    * [x] Init npm
    * [x] Add express morgan cors body-parser
    * [x] Create Hello World Route
* [x] Create Client folder
    * [x] Vue create client
    * [x] Add bootswatch CSS
    * [ ] Homepage layout
* [ ] Add DB to server
    * [ ] Add monk joi
    * [ ] Create message model
    * [ ] Create route to add message to db
        * [ ] Validate message with joi
            * username - default to anonymous
            * subject
            * message
            * imageURL
            * created_at
        * [ ] insert message to db
        * [ ] respond with inserted message
* [ ] Create new message form on client
    * [ ] Submit form - fetch POST to server
* [ ] User can reply to a message
    * [ ] Reply appears under original message
* [ ] Group messages into categories
* [ ] Deploy!