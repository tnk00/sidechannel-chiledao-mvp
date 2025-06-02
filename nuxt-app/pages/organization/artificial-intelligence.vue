<template>
<section class="section">
  <div class="container">
    <SectionHeader :breadcrumbs="breadcrumbs" />
    <SectionNav>
      <template #filters>
        <li class="list-item"><NuxtLink to="/organization" class="list-link" :class="{ 'is-active': route.path === '/organization' }">Details</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/payments" class="list-link" :class="{ 'is-active': route.path === '/organization/payments' }">Payments</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/artificial-intelligence" class="list-link" :class="{ 'is-active': route.path === '/organization/artificial-intelligence' }">Artificial Intelligence</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/members" class="list-link" :class="{ 'is-active': route.path === '/organization/members' }">Members</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/dev-tools" class="list-link" :class="{ 'is-active': route.path === '/organization/dev-tools' }">Dev Tools</NuxtLink></li>
      </template>
    </SectionNav>
    <div class="block pt-5">
      <div class="columns mb-7">
        <div class="column is-4">
          <div class="field">
            <label class="label">Model</label>
            <div class="control">
              <select class="select">
                <option selected>gemini-2.0-flash</option>
                <option>gemini-2.5-flash-preview-05-20</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-8">
          <div class="field">
            <label class="label">API Key</label>
            <div class="control">
              <input class="input" type="password" placeholder="Your API Key" value="sk_test_51Mv8tYJqYzTzXgF9bL8rWcApT7eVn3Q2WxYxFg0lG3vTzV6nT9kLz2vQ7Rw2PqJ">
            </div>
          </div>
        </div>
      </div>
      <ul class="tabs has-divider mb-4">              
        <li class="tab-item">
          <NuxtLink @click="activeTab = 'context'" class="tab-link" :class="{ 'is-active': activeTab === 'context' }">Context</NuxtLink>
        </li>
        <li class="tab-item">
          <NuxtLink @click="activeTab = 'guidelines'" class="tab-link" :class="{ 'is-active': activeTab === 'guidelines' }">Guidelines</NuxtLink>
        </li>
      </ul>

      <div v-if="activeTab === 'context'">
        <p>This information will be used by the AI to understand your organization’s purpose and goals, and to evaluate tasks based on how well they contribute to your strategic direction.</p>
        <div class="mb-7">
          <div class="field">
            <label class="label">Mission</label>
            <div class="control">
              <textarea class="textarea" placeholder="What is your organization's core purpose or reason for existing?" rows="3"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Vision</label>
            <div class="control">
              <textarea class="textarea" placeholder="What future is your organization working to create?" rows="3"></textarea>
            </div>
          </div>              
        </div>
          <h2 class="title is-size-3">Strategic objectives</h2>
          <p>List the long-term goals or priorities that guide your organization's actions.</p>            
          <div class="items has-gap-medium mb-3">
            <div class="item">
              <div class="item-body">
                <div class="item align-items-center mb-2">
                  <div class="item-body">
                    <h3 class="title mb-0 is-size-7">Objective #1</h3>
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
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Title" value="Descentralización de la gobernanza">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" placeholder="Description">Facilitar procesos que permitan una toma de decisiones más equitativa y transparente.
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-body">
                <div class="item align-items-center mb-2">
                  <div class="item-body">
                    <h3 class="title mb-0 is-size-7">Objective #2</h3>
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
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Title" value="Educación y adopción tecnológica">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" placeholder="Description">Promover el conocimiento en Web3, contratos inteligentes y herramientas descentralizadas.</textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-body">
                <div class="item align-items-center mb-2">
                  <div class="item-body">
                    <h3 class="title mb-0 is-size-7">Objective #3</h3>
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
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Title" value="Crecimiento de la comunidad">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" placeholder="Description">Fomentar la interacción entre miembros y la expansión del ecosistema.</textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-body">
                <div class="item align-items-center mb-2">
                  <div class="item-body">
                    <h3 class="title mb-0 is-size-7">Objective #4</h3>
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
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Title" value="Infraestructura y herramientas">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" placeholder="Description">Desarrollar tecnologías y plataformas que faciliten la operación de la DAO.</textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-body">
                <div class="item align-items-center mb-2">
                  <div class="item-body">
                    <h3 class="title mb-0 is-size-7">Objective #5</h3>
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
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Title" value="Alianzas estratégicas">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" placeholder="Description">Colaborar con otros proyectos y organizaciones para fortalecer el impacto de la DAO.</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-end ml-auto">
              <button class="button is-small is-muted is-clear">
                <span class="icon">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0Z"/>
                  </svg>
                </span>
                <span>Add objective</span>
              </button>
            </div>
          </div>
      </div>
      <div v-else-if="activeTab === 'guidelines'">
        <div class="field mb-7">
          <label class="label">Main Tasks and Activities</label>
          <div class="control">
            <textarea class="textarea" placeholder="What types of tasks or activities does your organization typically carry out?" rows="3"></textarea>
          </div>
        </div>
        <h2 class="title is-size-3">Scoring Guidelines</h2>
        <p>Provide reference scores and examples to help the AI understand how your organization defines and recognizes high-value or high-impact contributions.</p>          
        <div class="items has-gap-medium mb-3">
          <div class="item">
            <div class="item-body">
              <div class="item align-items-center mb-2">
                <div class="item-body">
                  <h3 class="title mb-0 is-size-7">Example #1</h3>
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
              <div class="field mb-3">
                <div class="control">
                  <textarea class="textarea" placeholder="Description">Requiere habilidades avanzadas (dev, estrategia, multi-equipo). Ej: Smart contract.
                  </textarea>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Criteria</label>
                    <div class="control">
                      <select class="select">
                        <option>Value Added</option>
                        <option selected>Complexity</option>
                        <option>Scope of Work</option>
                      </select>
                    </div>
                  </div> 
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Min Score</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="0.0" value="0.8">
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Max Score</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="0.0" value="1.0">
                    </div>
                  </div>
                </div>
              </div>                  
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-end ml-auto">
            <button class="button is-small is-muted is-clear">
              <span class="icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0Z"/>
                </svg>
              </span>
              <span>Add example</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
  const sectionTitle = ref('Organization');
  const route = useRoute()
  const activeTab = ref('context')

  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])
  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>