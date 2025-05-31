// stores/workstreams.js
import { defineStore } from 'pinia'

export const useWorkstreamsStore = defineStore('workstreams', () => {
  const workstreams = ref([
    {
      slug: 'programa-web3-para-universidades',
      title: 'Programa Web3 para Universidades',
      status: 'active',
      tasks: [
        { id: 'tas-63',
          title: 'Diseño de ficha informativa “Construye el futuro con blockchain” para difusión estudiantil',
          priority: 'high',
          status: 'in-progress',
          assignee: 'Allan Koryzma',
          description: 'Se diseñó en Figma una pieza gráfica orientada a estudiantes con información clave sobre la tecnología blockchain y el mensaje central “Construye el futuro con blockchain”. La ficha se distribuye de forma digital mediante código QR en actividades presenciales. Esta acción busca difundir la marca de ChileDAO y facilitar el acceso a contenido introductorio sobre Web3.',
          score: {
            valueAdded: 0.7,
            complexity: 0.5,
            scope: 0.4,
            total: 173
          }
        },
        { id: 'tas-64',
          title: 'Gestión de vínculo institucional con Centro de Innovación Universitaria',
          priority: 'low',
          status: 'done',
          assignee: 'Allan Koryzma',
          description: 'Se realizaron gestiones para establecer el vínculo institucional entre ChileDAO y el Centro de Innovación de una Universidad. Este trabajo incluyó el contacto inicial, reuniones de presentación, conversaciones de alineamiento y coordinación, que finalmente permitieron la participación de ChileDAO en el programa de innovación como organización colaboradora. Esta tarea fue fundamental para abrir un espacio de visibilidad, colaboración y educación Web3 con estudiantes universitarios.',
          score: {
            valueAdded: 0.8,
            complexity: 0.6,
            scope: 0.5,
            total: 234
          }
        },
        { id: 'tas-65',
          title: 'Participación en programa de innovación del Centro de Innovación Universitaria',
          priority: 'low',
          status: 'pending',
          assignee: 'Allan Koryzma',
          description: 'ChileDAO fue invitado a participar como organización colaboradora en el programa de innovación del Centro de Innovación de una Universidad. Se asistió a la sesión inaugural (3 hrs) para conocer a los estudiantes y presentar el potencial de la tecnología blockchain. Esta actividad marca el inicio de una colaboración que incluirá mentorías temáticas y un futuro bootcamp enfocado en blockchain.'
        }
      ]
    },
    {
      slug: 'operaciones-mayo-2025',
      title: 'Operaciones Mayo 2025',
      status: 'completed',
      tasks: [
        { id: 'tas-62',
          title: 'Creación de documento de onboarding para nuevas personas en ChileDAO',
          priority: 'low',
          status: 'done',
          assignee: 'Allan Koryzma',
          description: 'Se compiló un documento de referencia rápida en Notion destinado a quienes se integran por primera vez a ChileDAO. El contenido explica de forma clara y accesible el funcionamiento general de la DAO, sus objetivos, estructura y las distintas formas de participación. Este recurso se incorpora al proceso de onboarding para facilitar la integración y autonomía de nuevos miembros.'
        }
      ]
    },
    {
      slug: 'dao-launch-party',
      title: 'DAO Launch Party',
      status: 'draft',
      tasks: []
    },
    {
      slug: 'lanzamiento-podcast-comunidad-web3',
      title: 'Lanzamiento Podcast Comunidad Web3',
      status: 'completed',
      tasks: []
    },
    {
      slug: 'planificacion-hackathon-invierno-2025',
      title: 'Planificación Hackathon Invierno 2025',
      status: 'completed',
      tasks: []
    },
    {
      slug: 'configuracion-multisig-tesoreria',
      title: 'Configuración de Multisig y Tesorería',
      status: 'completed',
      tasks: []
    }
  ])

  const getBySlug = (slug) => workstreams.value.find(ws => ws.slug === slug)

  const getTask = (slug, taskId) => {
    const ws = getBySlug(slug)
    return ws?.tasks?.find(t => t.id === taskId)
  }

  const allTasks = computed(() =>
    workstreams.value.flatMap(ws => ws.tasks.map(task => ({
      ...task,
      workstreamSlug: ws.slug,
      workstreamTitle: ws.title
    })))
  )

  return {
    workstreams,
    getBySlug,
    getTask,
    allTasks
  }
})
