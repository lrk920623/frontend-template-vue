export default function(context) {
  context.$api = apiFactory(context.$axios)
}

function apiFactory(axios) {}
