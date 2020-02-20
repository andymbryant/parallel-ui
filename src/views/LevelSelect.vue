<template>
  <div class="level-select-background">
    <TopBar title="Level Selection"/>
      <div class="level-select-content">
        <div class="select-title">REQUIRED LEVELS</div>
        <div class="level-icons-ctr">
          <LevelIcon v-for="level in levels" :level="level" :key="level"/>
        </div>
      <div class="select-title">GENERATED LEVELS</div>
      <div class="add-level-button">
        <i class='fas fa-plus'></i>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue'
import LevelIcon from '@/components/LevelIcon.vue'

export default {
  name: 'LevelSelect',
  components: {
    TopBar,
    LevelIcon
  },
  data: function() {
    return {
      levels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17']
    }
  },
}
</script>

<style>
.level-select-background {
  width: 100%;
  height: 100%;
  background-color: #415054;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.level-select-content {
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.level-icons-ctr {
  display: flex;
  flex-wrap: wrap;
}

.select-title {
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2rem 0 1rem 0;
}

.add-level-button {
  background-color: #be5e35;
  width: 20px;
  height: 20px;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

}

</style>
