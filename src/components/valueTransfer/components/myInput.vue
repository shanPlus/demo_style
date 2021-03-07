<template>
  <input
    type="text"
    :value="$attrs.value"
    @input="$emit('input', $event.target.value)"
  >
</template>
