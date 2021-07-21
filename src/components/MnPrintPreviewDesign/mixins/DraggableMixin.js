
export default {
  data() {
    return {
      currentX: 0,
      currentY: 0,
    }
  },
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    setProperties: {
      type: Function,
      default: (styles, attributes)=> {}
    },
  },
  inject: {
    container: {
      default: null
    }
  },
  methods: {
    onMouseDown(e) {
      if(!this.draggable) return 0;
      this.currentX = e.clientX;
      this.currentY = e.clientY;
      this.isMouseDown = true;
    },
    onMouseMove(e) {
      e.stopPropagation();
      if(this.isMouseDown) {
        this.offsetX = e.clientX - this.currentX;
        this.offsetY = e.clientY - this.currentY;
        this.transform = this.toTransform(this.offsetX, this.offsetY);
      }
    },
    toTransform(offsetX, offsetY) {
      return `translate(${offsetX}px, ${offsetY}px)`;
    },
    onMouseUp(e) {
      e.stopPropagation();
      const {left, top } = this.$refs.root.getBoundingClientRect();
      const containerPosition = this.container.getRect();
      const actualLeft = left - containerPosition.left - 1;
      const actualTop = top - containerPosition.top - 1;
      this.$emit('updatePosition', { left: actualLeft, top: actualTop });
      this.transform = '';
      this.isMouseDown = false;
    },
    onMouseLeave(e) {
      if(this.isMouseDown) {
        this.isMouseDown = false;
        this.onMouseUp(e);
      }
    }
  }
}