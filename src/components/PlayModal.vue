<script setup lang="ts">
import ModalDialog from "./ModalDialog.vue";
import Button from "./Button.vue";
const props = defineProps<{
  show: boolean;
  onClose: () => void;
}>();
</script>

<template>
  <ModalDialog :show @onClose="onClose">
    <div>
      <RouterLink to="/matchmaking">
        <Button fontSize="1.4rem">Quick Match</Button>
      </RouterLink>
      <RouterLink to="/Rooms">
        <Button disabled fontSize="1.4rem">Create Room</Button>
      </RouterLink>
      <RouterLink to="/Rooms/{id}">
        <Button disabled fontSize="1.4rem">Join Room</Button>
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
  align-items: center;
}
</style>
