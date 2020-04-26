<template>
	<div>
		<Navbar />
		<UploadForm class="container mt-4" />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import UploadForm from '@/components/UploadForm.vue'

export default {
	name: 'Upload',
	components: {
		Navbar,
		UploadForm
	}
}
</script>