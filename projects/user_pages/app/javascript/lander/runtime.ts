const styleGuideAttributes = [
  'data-style-guide-shadow',
  'data-style-guide-border',
  'data-style-guide-button',
  'data-style-guide-headline',
  'data-style-guide-subheadline',
  'data-style-guide-content',
  'data-style-guide-corner',
]

type RuntimeSelectorsType = [string, Record<string, any>][]
export class CF2Component {
  id: string
  subscribers: Record<string, (() => void)[]>
  params: Record<string, any>
  runtimeSelectors: RuntimeSelectorsType
  mutationOberver: MutationObserver

  constructor(protected element: CF2Element, runTimeSelectors?: RuntimeSelectorsType) {
    this.subscribers = {}
    this.id = Array.from(this.element.classList).find((c) => c.startsWith('id'))
    for (const propertyName of Object.getOwnPropertyNames(this.constructor.prototype)) {
      if (typeof this.constructor.prototype[propertyName] === 'function') {
        this.subscribers[propertyName] = []
      }
    }

    for (const dataName in this.element.dataset) {
      if (!dataName.startsWith('param')) {
        this[dataName] = this.element.dataset[dataName]
      }
    }

    // NOTE: Rename runtime selectors by removing applicable data-page-elements
    runTimeSelectors = runTimeSelectors?.map((selector) => {
      const selectorName = selector[0]
        .replace(`[data-page-element="${this.element.getAttribute('data-page-element')}"]`, '')
        .trim()
      return [selectorName, selector[1]]
    })

    const stateNodeData = CF2Component.getStateNodeData(this.element)
    this.runtimeSelectors = [...(runTimeSelectors ?? [])]
    if (stateNodeData) {
      Object.assign(this, stateNodeData)
      this.runtimeSelectors = [...this.runtimeSelectors, ...(stateNodeData.runtimeSelectors ?? [])]
    }

    if (this.runtimeSelectors.length > 0) {
      this.mutationOberver = new MutationObserver((mut) => this.onMutation(mut))
      this.mutationOberver.observe(this.element, {
        attributeOldValue: true,
        attributeFilter: ['class'],
        subtree: true,
      })
    }
  }

  static getStateNodeData(element: CF2Element): Record<string, any> {
    const id = element.getAttribute('data-state-node-script-id')
    const stateNode = id && (document.getElementById(id) as HTMLElement)
    if (id && stateNode) {
      return JSON.parse(stateNode.textContent)
    }
  }

  onMutation(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      const element = mutation.target as HTMLElement
      for (const styleGuideAttr of styleGuideAttributes) {
        $(`[${styleGuideAttr}]`, element).removeAttr(styleGuideAttr)
      }
    }

    this.updateRuntimeState()
  }

  updateRuntimeState(): void {
    for (const [selector, attrs] of this.runtimeSelectors) {
      const $selected = $(selector, this.element)
      for (const attr in attrs) {
        $selected.attr(attr, attrs[attr])
      }
    }
  }

  // eslint-disable-next-line
  mount(element?: CF2Element): void {}

  getComponent(name: string): CF2Component {
    return this.element.querySelector<CF2Element>(`[data-page-element="${name}"]`)?.cf2_instance
  }

  getComponents(name: string): CF2Component[] {
    return Array.from(this.element.querySelectorAll<CF2Element>(`[data-page-element="${name}"]`))?.map(
      (c) => c.cf2_instance
    )
  }

  getAllComponents(): Record<string, CF2Component> {
    const componentList: Record<string, CF2Component> = {}
    Array.from(this.element.querySelectorAll<CF2Element>('[data-page-element]'))?.forEach((c) => {
      const pageElement = c.getAttribute('data-page-element').replace('/', '')
      componentList[pageElement] = c.cf2_instance
    })
    return componentList
  }

  on(eventName: string, eventHandler: () => void): void {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].push(eventHandler)
    } else {
      console.warn(`Event ${eventName} not supported by ${this.constructor.name}`)
    }
  }
  // NOTE: Build components by firstly building inner elements, and then walking up tree.
  // As we need to move from the leaf nodes to parent nodes. It also accepts a list of old
  // components in which you can re-use components built from an old list.
  static hydrateTree(parentNode?: HTMLElement, parentNodeRunTimeSelectors?: RuntimeSelectorsType): void {
    const nodes = (parentNode ?? document).querySelectorAll<CF2Element>('[data-page-element]')
    nodes.forEach((node) => {
      const closestPageElement = $(node.parentNode).closest('[data-page-element]')[0]
      if (closestPageElement == parentNode || closestPageElement == null) {
        const nodeRunTimeSelectors = [
          ...(CF2Component.getStateNodeData(node)?.runtimeSelectors ?? []),
          ...(parentNodeRunTimeSelectors ?? []),
        ]

        CF2Component.hydrateTree(node as CF2Element, nodeRunTimeSelectors)

        const klassName = node.getAttribute('data-page-element').replace('/', '')
        const ComponentBuilder = window[klassName]
        if (ComponentBuilder) {
          node.cf2_instance = new ComponentBuilder(node, nodeRunTimeSelectors)
          node.cf2_instance.mount()
          node.cf2_instance.updateRuntimeState()
        }
      }
    })
  }
}

globalThis.CF2Component = CF2Component

interface CF2Element extends HTMLElement {
  cf2_instance: CF2Component
}

globalThis.CF2HydrateTreeInitialized = false
window.addEventListener('DOMContentLoaded', () => {
  if (!globalThis.CF2HydrateTreeInitialized) CF2Component.hydrateTree()
  globalThis.CF2HydrateTreeInitialized = true
})

export class ForloopDrop {
  protected i = 0
  public length: number
  public constructor(length: number) {
    this.length = length
  }
  public next(): void {
    this.i++
  }
  get index0(): number {
    return this.i
  }
  get index(): number {
    return this.i + 1
  }
  get first(): boolean {
    return this.i === 0
  }
  get last(): boolean {
    return this.i === this.length - 1
  }
  get rindex(): number {
    return this.length - this.i
  }
  get rindex0(): number {
    return this.length - this.i - 1
  }
}

globalThis.CF2ForloopDrop = ForloopDrop

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
globalThis.CF2Utils = globalThis.CF2Utils ?? {}
globalThis.CF2Utils.uuidv4 = uuidv4

class CF2ComponentSingleton {
  private static _instance: CF2ComponentSingleton
  static getInstance() {
    if (this._instance) {
      return this._instance
    }
    this._instance = new this()
    return this._instance
  }
}

globalThis.CF2ComponentSingleton = CF2ComponentSingleton
