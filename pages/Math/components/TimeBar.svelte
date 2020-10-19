<script>
  import { time } from "../store/time";
</script>

<!-- ################################################################## -->

<progress value={$time} max="30000"></progress>

<!-- ################################################################## -->

<style>
  progress {
    display: inline-block;
    width: 90%;
  }
  ::-webkit-progress-bar {
    background-color: #ddd;
    border: 1px solid green;
  }
  ::-webkit-progress-value {
    background-color: rgb(124, 174, 238);
  }
</style>
