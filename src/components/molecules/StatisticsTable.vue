<template>
  <button class="btn btn-outline-secondary mb-2">Toggle statistics</button>

  <div class="table-responsive mb-2">
    <table class="table">
      <tr>
        <th>Rolls total</th>
        <td></td>
      </tr>
      <tr>
        <th>Rolls better than average</th>
        <td class="table-success"></td>
      </tr>
      <tr>
        <th>Rolls equal to average</th>
        <td class="table-warning"></td>
      </tr>
      <tr>
        <th>Rolls worse than average</th>
        <td class="table-danger"></td>
      </tr>
      <tr>
        <th>Sum of all rolls</th>
        <td></td>
      </tr>
    </table>
  </div>
</template>
