<template>
  <div class="home">
    <button class="btn btn-primary btn-add" @click="showForm()"><span class="fa fa-plus"></span></button>
    <h1 class="text-center">The message board</h1>
    <ul class="list-unstyled">
      <li class="media py-3" v-for="message in messages" :key="message._id">
        <img :src="message.imageUrl" class="mr-3" :alt="message.subject" :title="message.subject" v-if="message.imageUrl">
        <div class="media-body">
          <p class="mt-0 mb-1 font-italic">{{ message.username }}</p>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          <p>{{ message.message }}</p>
          <small>{{message.created}}</small>
        </div>
      </li>
    </ul>

    <div class="add-form col-sm-2 bg-secondary">
      <form>
        <div class="form-group">
          <label for="username">Username <span class="required">*</span></label>
          <input type="text" name="username" id="username" class="form-control" value="Anonymous" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject <span class="required">*</span></label>
          <input type="text" name="subject" id="subject" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="messageLength" @keyup="charCount()" name="message" id="message" rows="3" class="form-control"></textarea>
          <span class="text-muted small">{{ totChar }} / 500</span>
        </div>
        <div class="form-group">
          <label for="imageUrl">Upload image</label>
          <input type="file" name="imageUrl" id="imageUrl">
        </div>
        <button type="submit" class="btn btn-secondary btn-block"></button>
      </form>
    </div>

  </div>
</template>

<script>
const API_URL = 'http://localhost:1337/messages';

export default {
  name: 'Home',
  data: () => ({
    messages: [],
    messageLength: "",
    totChar: 0,
  }),
  mounted() {
    fetch(API_URL).then(response => response.json()).then(result => {
      this.messages = result;
    });
  },
  methods: {
    showForm() {
      $('.add-form').toggleClass('open');
    },
    charCount() {
      this.totChar = this.messageLength.length;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: auto;
  max-width: 300px;
}
li {
  border-bottom: 1px solid #FFF;
}
.btn-add {
  border-radius: 50%;
  padding: 1rem 1.3rem;
  position: fixed;
  bottom: 50px;
  right: 50px;
  transition: all 200ms;
  box-shadow: 3px 3px 20px rgba(0,0,0,0.5);
}
.btn-add:hover {
  transform: scale(1.05);
}
.fa-plus {
  font-size: 2rem;
}
.add-form {
  /* background: #FFF; */
  border: 1px solid #FFF;
  border-radius: 15px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
  padding: 2rem 1rem;
  position: fixed;
  right: -350px;
  top: 10%;
  transition: all 200ms ease;
}
.open {
  right: 10px;
}
.add-form .form-control, .add-form .btn {
  border-radius: 10px;
}
.required {
  color: #FF0000;
}
</style>
