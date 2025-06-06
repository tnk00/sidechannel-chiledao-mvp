<template>
  <section class="section">
    <div class="container">
    <SectionHeader :breadcrumbs="breadcrumbs">
      <template #actions>
        <li class="list-item">
          <NuxtLink :to="`/workstreams/${slug}`" class="button is-small is-muted is-outlined has-icon-only radius-rounded" title="Back">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11.293 4.293a1 1 0 1 1 1.414 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-7-7a1 1 0 0 1 0-1.414l7-7Z"/>
              </svg>                      
            </span>
          </NuxtLink>
        </li>
      </template>
    </SectionHeader>
      <div class="block pt-5">
        <div class="mb-4">
          <h1 class="title is-size-2">{{ task?.title }}</h1>
          <span class="text-muted is-size-7 text-uppercase">ID {{ task?.id }}</span>
        </div>
        <ul class="tabs has-divider mb-4">              
          <li class="tab-item">
            <NuxtLink @click="activeTab = 'details'" class="tab-link" :class="{ 'is-active': activeTab === 'details' }">Details</NuxtLink>
          </li>
          <li class="tab-item">
            <NuxtLink @click="activeTab = 'score'" class="tab-link" :class="{ 'is-active': activeTab === 'score' }">Score</NuxtLink>
          </li>
          <li class="tab-item">
            <NuxtLink @click="activeTab = 'edit'" class="tab-link" :class="{ 'is-active': activeTab === 'edit' }">Edit</NuxtLink>
          </li>
        </ul>
        <div v-if="activeTab === 'details'">
          <ul class="list-inline is-size-7 mb-6">
            <li class="list-item">
              <span class="mr-1">Status:</span>
              <span class="badge" :class="getTaskStatusBadge(task.status).class">{{ getTaskStatusBadge(task.status).text }}</span>   
            </li>
            <li class="list-item">
              <div class="d-flex align-items-center">
                <span class="mr-1">Priority:</span>            
                <span class="dot" :class="getPriorityDot(task.priority)"></span>
              </div>
            </li>
            <li class="list-item">
              <div class="d-flex align-items-center">
                <span class="mr-1">Assignee:</span>                 
                <span class="icon is-small text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                  </svg>
                </span>
                <span class="text-muted">{{ task.assignee }}</span>
              </div>
            </li>
          </ul>
          <div class="entry is-size-5">
            <p>{{ task?.description }}</p>
          </div>     
        </div>
        <div v-else-if="activeTab === 'score'">
          <template v-if="task.score">
            <div class="columns align-items-center  text-center mb-4">
              <div class="column is-3-mobile mb-3 mb-0-mobile">
                <div class="line-height-1 is-size-2">{{ task.score.total }}</div>
                <span class="heading-line-height">Reward</span>
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column is-4">
                    <div class="is-size-4 line-height-1">{{ task.score.valueAdded }}</div>
                    <span class="d-block is-size-7 text-muted heading-line-height">Value Added</span>
                  </div>
                  <div class="column is-4">
                    <div class="is-size-4 line-height-1">{{ task.score.complexity }} </div>
                    <span class="d-block is-size-7 text-muted heading-line-height">Complexity</span>
                  </div>
                  <div class="column is-4">
                    <div class="is-size-4 line-height-1">{{ task.score.scope }}</div>
                    <span class="d-block is-size-7 text-muted heading-line-height">Scope of Work</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item border-top pt-1 is-size-7 text-muted mb-6">
              <div class="item-body">Classification: {{ taskClassification }}</div>
              <div class="item-end">Reward range:
                <template v-if="taskClassification === 'simple'">5-50 tokens</template>
                <template v-else-if="taskClassification === 'intermediate'">50-250 tokens</template>
                <template v-else-if="taskClassification === 'complex'">250-1000 tokens</template>
                <template v-else>Unknown</template>
              </div>
            </div>
            <h4 class="title ml-3">AI Reasoning</h4>
            <ul class="list text-neutral is-size-7">
              <li class="list-item">
                <div class="border border-dashed radius-medium p-2 p-3-mobile">
                  <b class="d-block mb-1">Value Added ({{ task.score.valueAdded }})</b>
                  <p>{{ task.reasoning.valueAdded }}</p>
                </div>
              </li>
              <li class="list-item">
                <div class="border border-dashed radius-medium p-2 p-3-mobile">
                  <b class="d-block mb-1">Complexity ({{ task.score.complexity }})</b>
                  <p>{{ task.reasoning.complexity }}</p>
                </div>
              </li>
              <li class="list-item">
                <div class="border border-dashed radius-medium p-2 p-3-mobile">
                  <b class="d-block mb-1">Scope of Work ({{ task.score.scope }})</b>
                  <p>{{ task.reasoning.scope }}</p>
                </div>
              </li>
            </ul>
            <div class="pl-3 mt-3 text-muted is-size-8">
              AI Evaluation 05-05-2025 14:51:27 gemini-2.0-flash.
            </div> 
          </template>
          <div v-else class="text-center">
            <p class="text-center">Not scored yet</p>
            <span v-if="isLoading" class="loader mx-auto"></span>
            <button v-else class="button is-primary is-clear" @click="handleAIEvaluation">
              <span class="icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M2 21v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H5.414l.541.541.31.286A8.749 8.749 0 0 0 12.003 20 7.999 7.999 0 0 0 20 12a1 1 0 1 1 2 0 10 10 0 0 1-10 10h-.004a10.75 10.75 0 0 1-7.05-2.67l-.393-.363L4 18.414V21a1 1 0 1 1-2 0Zm0-9A10 10 0 0 1 12 2h.004l.519.015a10.75 10.75 0 0 1 6.53 2.655l.394.363.553.553V3a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 1 1 0-2h2.586l-.541-.541-.31-.286A8.75 8.75 0 0 0 11.996 4 8 8 0 0 0 4 12a1 1 0 1 1-2 0Z"/></svg>
              </span>
              <span>AI Evaluation</span>
            </button>
            <div v-if="evaluationResult">
              <h3>Resultado de la Evaluación AI:</h3>
              <p>{{ evaluationResult }}</p>
            </div>
            <div v-if="error">
              <p style="color: red;">Error: {{ error }}</p>
            </div>
          </div>          
        </div>
        <div v-else-if="activeTab === 'edit'">
          <div class="item mb-4">
            <div class="item-body">
              <h2 class="title mb-0 is-size-3">Task</h2>
            </div>
            <div class="item-end">
              <ul class="list-inline has-gap-small">
                <li class="list-item">
                  <button class="button is-small is-muted is-clear has-icon-only radius-rounded" title="More">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                      </svg>                      
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="columns mb-7">
            <div class="column is-12-mobile mb-3">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Name">
                </div>
              </div>
            </div>
            <div class="column is-12-mobile mb-3">
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Description" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Status</label>
                <div class="control">
                  <select class="select">
                    <option selected>Draft</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Paused</option>
                  </select>
                </div>
              </div>     
            </div>
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Priority</label>
                <div class="control">
                  <select class="select">
                    <option selected>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>     
            </div>
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Assignee</label>
                <div class="control">
                  <select class="select">
                    <option selected>None</option>
                    <option>Allan Koryzma</option>
                  </select>
                </div>
              </div>     
            </div>
          </div>
          <div class="item mb-4">
            <div class="item-body">
              <h2 class="title mb-0 is-size-3">Score</h2>
            </div>
            <div class="item-end">
              <ul class="list-inline has-gap-small">
                <li class="list-item">
                  <button class="button is-small is-muted is-clear has-icon-only radius-rounded" title="More">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                      </svg>                      
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="columns">
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Value Added</label>
                <div class="control">
                  <input class="input" type="text" placeholder="0.0">
                </div>
              </div>     
            </div>
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Complexity</label>
                <div class="control">
                  <input class="input" type="text" placeholder="0.0">
                </div>
              </div>     
            </div>
            <div class="column is-4-mobile">
              <div class="field">
                <label class="label">Scope of Work</label>
                <div class="control">
                  <input class="input" type="text" placeholder="0.0">
                </div>
              </div>     
            </div>
          </div>
        </div>  
      </div>
    </div>
  </section>
</template>

<script setup>
  const route = useRoute()
  const { slug, taskId } = route.params
  const workstreamsStore = useWorkstreamsStore()
  const workstream = workstreamsStore.getBySlug(slug)
  const task = workstreamsStore.getTask(slug, taskId)
  const sectionTitle = ref('Workstreams')
  const sectionSubtitle = ref(workstream?.title || '')
  const activeTab = ref('details')
  
  const calculateTaskScore = (task) => {
    if (!task || !task.score) return 0;
    const { valueAdded, complexity, scope } = task.score;
    return (valueAdded + complexity + scope) / 3;
  }

  const classifyTask = (task) => {
    if (!task || !task.score) return 'unknown';
    const s = calculateTaskScore(task);
    if (s <= 0) return 'unknown';
    if (s <= 0.33) return 'simple';
    if (s <= 0.66) return 'intermediate';
    return 'complex';
  }

  const isLoading = ref(false);
  const evaluationResult = ref(null);
  const error = ref(null);
  const taskClassification = ref(classifyTask(task));

  const getTaskStatusBadge = (status) => {
    const map = {
      draft: { text: 'Draft', class: 'is-muted' },
      'in-progress': { text: 'In progress', class: 'is-primary' },
      done: { text: 'Done', class: 'is-success' }
    }
    return map[status] || { text: 'Pending', class: 'is-muted' }
  }

  const getPriorityDot = (priority) => {
    const map = {
      high: 'is-alert',
      medium: 'is-warning',
      low: 'is-muted'
    }
    return map[priority] || 'is-muted'
  }

  const breadcrumbs = computed(() => [
    { text: sectionTitle, to: '/' },
    { text: sectionSubtitle, to: `/workstreams/${slug}` },
  ])

  useSeoMeta({
    title: `${sectionTitle.value} - ${sectionSubtitle.value} - ${task?.title}`
  })

  // Datos de ejemplo para el prompt y el texto a analizar
  // en task?.description está la descripción a evaluar

  isLoading.value = false;
  evaluationResult.value = null;
  error.value = null;

  async function handleAIEvaluation() {
    isLoading.value = true;
    evaluationResult.value = null; // Reiniciar el resultado
    error.value = null; // Reiniciar errores

    try {
      // Usamos $fetch de Nuxt, que es un wrapper para fetch que funciona tanto en cliente como en servidor
      const response = await $fetch('/api/evaluate-ai', {
        method: 'POST',
        body: {
          task: task, // Convertimos la tarea a JSON
          workstream: workstream, // Convertimos el workstream a JSON
        }
      });

      if (response && response.success) {
        const parsedJson = parseCodeBlockToJson(response.evaluationResult);
        if (parsedJson) {
          console.log("JSON parseado exitosamente:");
          console.log(parsedJson);
          // Puedes acceder a sus propiedades, por ejemplo:
          // console.log(parsedJson.valor_agregado.score);
          task.score = {
            valueAdded: parsedJson.valor_agregado.score,
            complexity: parsedJson.complejidad.score,
            scope: parsedJson.magnitud_trabajo.score,
            total: 0,
          };
          task.reasoning = {
            valueAdded: parsedJson.valor_agregado.reasoning,
            complexity: parsedJson.complejidad.reasoning,
            scope: parsedJson.magnitud_trabajo.reasoning,
          };
          const s = calculateTaskScore(task);
          taskClassification.value = classifyTask(task);
          const getScoreTotal = () => {
            switch (taskClassification.value) {
              case 'simple':
                return 5 + (s / 0.33) * 45; // 5-50 tokens
              case 'intermediate':
                return 50 + (s / 0.66) * 200; // 50-250 tokens
              case 'complex':
                return 250 + (s / 1) * 750; // 250-1000 tokens
              default:
                return 0 // Unknown classification
            };
          };
          task.score.total = Math.round(getScoreTotal());
          console.log("Tarea actualizada con la puntuación AI:", task.score);
        } else {
          console.log("No se pudo parsear el JSON.");
        }
        evaluationResult.value = parsedJson;
      } else {
        error.value = 'No se pudo obtener una respuesta válida de la evaluación AI.';
      }
    } catch (err) {
      console.error('Error al llamar a la ruta de servidor:', err);
      error.value = err.data?.message || 'Ocurrió un error inesperado al procesar la evaluación.';
    } finally {
      isLoading.value = false;
    }
  }

  function parseCodeBlockToJson(jsonString) {
    // Expresión regular para capturar el contenido dentro de ```json ... ```
    const regex = /```json\s*([\s\S]*?)\s*```/;
    const match = jsonString.match(regex);

    if (match && match[1]) {
      try {
        // Intentar parsear el contenido capturado como JSON
        return JSON.parse(match[1]);
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
        return null;
      }
    } else {
      console.error("No se encontró un bloque de código JSON válido.");
      return null;
    }
  }
</script>