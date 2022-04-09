<template>
  <div>
    <button class="button" aria-describedby="tooltip" @mouseover="cancelhide">
      My button
    </button>
    <div class="tooltip" role="tooltip" @mouseleave="hideHandler" @mouseover="cancelhide">
      <h3 style="margin: 6px;">ランク</h3>
      <div class="content" style="height: 246px; overflow: auto; background: white; padding: 10px;">
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
          This is content<br/>
      </div>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  data() {
    return {
      popperInstance: null,
      button: null,
      tooltip: null,
      hideTimeoutId: null,
      isPopupVisible: false,
    }
  },
  methods: {
    hideHandler() {
      this.hideTimeoutId = setTimeout(this.hide, 250)
    },
    cancelhide() {
      clearTimeout(this.hideTimeoutId)
    },
    show() {
      // Make the tooltip visible
      this.tooltip.setAttribute('data-show', '');

      // Enable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }));

      // Update its position
      this.popperInstance.update();
    },
    hide() {
      // Hide the tooltip
      this.tooltip.removeAttribute('data-show');

      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }));
    }
  },
  mounted() {
    this.button = this.$el.querySelector('.button');
    this.tooltip = this.$el.querySelector('.tooltip');

    this.popperInstance = createPopper(this.button, this.tooltip, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    this.button.addEventListener('mouseenter', this.show);
    this.button.addEventListener('mouseleave', this.hideHandler);
  }
}
</script>

<style>
.tooltip {
  background: rgb(121, 121, 121);
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  display: none;

  width: 540px;
  height: 300px;
}

.tooltip[data-show] {
  display: block;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

.tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
