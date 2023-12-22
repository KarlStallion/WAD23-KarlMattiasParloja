<template>
<h3>Courses</h3>

  <div class="container">
    <table>
        <tr class="item" v-for="course in courses" :key="course.id">
          <td><p>Course name: </p>{{ course.coursename }} </td>
          <td><p>Code: </p>{{ course.coursecode}} </td>
          <td><p>ECTS: </p>{{ course.courseects}} </td>
          <td><p>Max No. of Students: </p> {{ course.studentsnumbers }} </td>
          <td><p>No. of groups: </p>{{ course.groupsnumbers }} </td>
        </tr>

    </table>
  </div>


</template>

<script>

export default {
  name: "Courses",
    components: {

    },
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/courses`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

table{
  border-spacing:0;
  border-collapse:collapse;
  padding: 10px;
}

tr.item > td:first-child {
  background-color: grey;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

tr.item > td{
  background-color: grey;
}

tr.item > td:last-child {
  background-color: grey;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

td{
  padding: 10px;
}

p{
  font-weight: bold;
  margin: 0px;
}
</style>
