<template>
  <div class="home">
    <button class="btn btn-primary btn-add" @click="showForm()"><span class="fa fa-plus"></span></button>
    <h1 class="text-center">The message board</h1>
    <ul class="list-unstyled">
      <li class="media py-3" v-for="message in reversedMessages" :key="message._id">
        <img :src="message.imageUrl" class="mr-3" :alt="message.subject" :title="message.subject" v-if="message.imageUrl">
        <div class="media-body">
          <p class="mt-0 mb-1 font-italic">{{ message.username }} <span class="text-muted small">{{ message.created }}</span></p>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          <p>{{ message.message }}</p>
        </div>
      </li>
    </ul>

    <div class="add-form col-sm-2 bg-secondary">
      <form @submit.prevent="addMessage">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" class="form-control" v-model="message.username">
        </div>
        <div class="form-group">
          <label for="subject">Subject <span class="required">*</span></label>
          <input type="text" name="subject" id="subject" class="form-control" v-model="message.subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message <span class="required">*</span></label>
          <textarea v-model="message.message" @keyup="charCount()" name="message" id="message" rows="3" class="form-control" required></textarea>
          <span class="text-muted small">{{ totChar }} / 500</span>
        </div>
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input type="url" name="imageUrl" id="imageUrl" class="form-control" v-model="message.imageUrl">
        </div>
        <div class="alert alert-dismissible alert-danger" v-if="error">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Oh snap!</strong> {{ error }}
        </div>
        <div class="alert alert-dismissible alert-success" v-if="success">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Well done!</strong> You have posted a message on the greates message board on this planet!
        </div>
        <button type="submit" class="btn btn-primary btn-block">Add message</button>
      </form>
    </div>

  </div>
</template>

<script>
const API_URL = 'https://full-stack-message-board-znibb.herokuapp.com/messages';

export default {
  name: 'Home',
  data: () => ({
    messages: [],
    totChar: 0,
    error: '',
    success: false,
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageUrl: '',
    },
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
      this.totChar = this.message.message.length;
    },
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json()).then(result => {
        if(result.details) {
          // there was an error
          const error = result.details.map(detail => detail.message).join(' ');
          // console.log(error);
          console.log(result);
          this.error = error;
          this.success = false;
        } else {
          // console.log(result);
          this.messages.push(result);
          this.success = true;
          this.error = '';
          this.message.username = 'Anonymous';
          this.message.subject = '';
          this.message.message = '';
          this.message.imageUrl = '';
        }
      });
    }
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
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
  border-radius: 15px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
  padding: 2rem 1rem;
  position: fixed;
  right: -500px;
  top: 10%;
  transition: all 200ms ease;
}
@media screen and (max-width: 600px) {
  .add-form {
    width: 250px;
    top: 17%;
  }
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
