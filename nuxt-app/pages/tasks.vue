<template>
  <section class="section">
    <div class="container">
      <SectionHeader :breadcrumbs="breadcrumbs" />
      <div class="block pt-5">
        <p class="text-center">This section will display all tasks across workstreams in a single, ungrouped view.</p>
      </div>      
    </div>
  </section>
</template>

<script setup>
  const sectionTitle = ref('Tasks');
  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])

  useSeoMeta({
    title: sectionTitle,
    description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>