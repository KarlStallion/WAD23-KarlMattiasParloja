<template>
  <div class="A Course">
    <div class="form" v-for="course in course" :key="course.id">
      <h3>{{ course.coursename }} - {{ course.coursecode }} - {{ course.courseects }} ECTS</h3>
      <label>Max Number Of Students: </label>
      <input type="text" :placeholder="course.studentsnumbers" v-model="studentsnumbers"/>
      <label>Number of Groups: </label>
      <input type="text" :placeholder="course.groupsnumbers" v-model="groupsnumbers"/>
      <label>Course Decription: </label>
      <input type="text" :placeholder="course.description" v-model="description"/>
      <button @click="updateCourse">Update Course</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ACourse",
  data() {
    return {
      course: [],
      studentsnumbers: '',
      groupsnumbers: '',
      description: '',
    };
  },
  methods: {
    fetchRecords() {
      const id = this.$route.params.id;
      fetch(`http://localhost:3000/api/courses/${id}`)
          .then((response) => response.json())
          .then((data) => {
            this.course = data;
            console.log(this.course);
          })
          .catch((err) => console.log(err.message));
    },

    updateCourse() {
      const id = this.$route.params.id;
      fetch(`http://localhost:3000/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentsnumbers: this.studentsnumbers || this.course.description,
          groupsnumbers: this.groupsnumbers || this.course.description,
          description: this.description || this.course.description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.fetchRecords();
          this.$router.push('/Courses');
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRecords();
  }
};
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: black;
  text-align: center;
}
button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}

::placeholder {
  text-align: center;
}
</style>