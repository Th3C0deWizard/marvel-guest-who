<script setup lang="ts">
import ModalDialog from './ModalDialog.vue';
import Button from './Button.vue';
const props = defineProps<{
  show: boolean;
  onClose: () => void;
}>();

</script>

<template>
  <ModalDialog :show @onClose="onClose">
    <div>
      <RouterLink to="/matchmaking">
        <Button>Quick Match</Button>
      </RouterLink>
      <RouterLink to="/Rooms">
        <Button>Quick Match</Button>
      </RouterLink>
      <RouterLink to="/Rooms/{id}">
        <Button>Create Room</Button>
      </RouterLink>
    </div>
  </ModalDialog>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
