<template>
  <header class="section-header item">
    <div class="item-body d-flex align-items-center is-size-5">

      <!-- Si hay breadcrumbs, renderizar la secuencia -->
      <template v-if="breadcrumbs?.length">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <h1 v-if="index === 0" class="title font-weight-medium mb-0">
            <NuxtLink v-if="crumb.to" :to="crumb.to" class="text-contrasted">
              {{ crumb.text }}
            </NuxtLink>
            <span v-else>{{ crumb.text }}</span>
          </h1>

          <!-- para los siguientes ítems -->
          <template v-else>
            <span class="icon mx-1">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.293 5.293a1 1 0 0 1 1.338-.069l.076.069 6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L13.586 12 8.293 6.707l-.068-.076a1 1 0 0 1 .068-1.338Z"/>
              </svg>
            </span>            
            <NuxtLink v-if="crumb.to" :to="crumb.to" class="text-contrasted">{{ crumb.text }}</NuxtLink>            
            <span v-else>{{ crumb.text }}</span>
          </template>
        </template>
      </template>

      <!-- Fallback a título simple si no hay breadcrumbs -->
      <template v-else>
        <h1 class="title font-weight-medium mb-0">{{ title }}</h1>
      </template>
    </div>

    <div v-if="$slots.actions" class="item-end ml-4">
      <ul class="list-inline has-gap-small">
        <slot name="actions" />
      </ul>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  breadcrumbs: Array
})
</script>
