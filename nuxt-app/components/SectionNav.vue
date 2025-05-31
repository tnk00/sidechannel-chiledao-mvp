<template>
  <nav class="item mb-4">
    <div class="item-body d-flex align-items-center">
      <ul class="list-inline font-weight-medium is-size-7">
        <slot name="filters" />
      </ul>
    </div>
    <div class="item-end ml-4">
      <ul class="list-inline has-gap-small">
        <slot name="actions" />
      </ul>
    </div>
  </nav>
</template>