<template>
    <div>
		<div v-for="(alert, index) in alerts" v-bind:key="index">
			<b-alert :variant="alert.type" @dismissed="alertDismissed(index)" dismissible show>
				{{ alert.message }}
			</b-alert>
		</div>
        <h3>Upload a vine</h3>
        <b-form @submit="onSubmit">
            <b-form-group label="Type" label-for="template.type">
                <b-form-select id="type" :options="template.types" v-model="form.type">
                </b-form-select>
            </b-form-group>
            <div v-if="form.type == 'vine'" class="card form-card">
				<div v-if="loading" class="form-loading">
					<b-spinner label="Loading..." />
				</div>
                <div class="card-body">
                    <b-form-group label="Title">
                        <b-form-input v-model="form.title" placeholder="I love you bitch"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-form-input v-model="form.description" placeholder="I love you, bitch. I ain't never gonna stop loving you, bitch."></b-form-input>
                    </b-form-group>
                    <b-form-group label="Vine URL">
                        <b-form-input v-model="form.url" placeholder="https://vine.co/v/{vineId}"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Author URL">
                        <b-form-input v-model="form.author_url" placeholder="https://vine.co/u/{creator}"></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div v-if="form.type == 'youtube'" class="card form-card">
				<div v-if="loading" class="form-loading">
					<b-spinner label="Loading..." />
				</div>
                <div class="card-body">
                    <b-form-group label="Title">
                        <b-form-input v-model="form.title" placeholder="I love you bitch"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-form-input v-model="form.description" placeholder="I love you, bitch. I ain't never gonna stop loving you, bitch."></b-form-input>
                    </b-form-group>
                    <b-form-group label="YouTube URL">
                        <b-form-input v-model="form.url" placeholder="https://youtube.com/v/watch?v={videoId}"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Author URL">
                        <b-form-input v-model="form.author_url" placeholder="https://vine.co/u/{creator}"></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div v-if="form.type == 'video'" class="card form-card">
				<div v-if="loading" class="form-loading">
					<b-spinner label="Loading..." />
				</div>
                <div class="card-body">
                    <b-form-group label="Title">
                        <b-form-input v-model="form.title" placeholder="I love you bitch"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-form-input v-model="form.description" placeholder="I love you, bitch. vcI ain't never gonna stop loving you, bitch."></b-form-input>
                    </b-form-group>
                    <b-form-group label="File">
                        <b-form-file v-model="form.video"></b-form-file>
                    </b-form-group>
                    <b-form-group label="Video URL">
                        <b-form-input v-model="form.url" placeholder="https://whatever.dick"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Author URL">
                        <b-form-input v-model="form.author_url" placeholder="https://vine.co/u/{creator}"></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div v-if="form.type == 'csv'" class="card form-card">
				<div v-if="loading" class="form-loading">
					<b-spinner label="Loading..." />
				</div>
                <div class="card-body">
                    <b-form-group label="CSV File (Vines only)" description="Four columns, comma seperated (Title, Description, URL, Author URL)">
                        <b-form-file v-model="form.csv"></b-form-file>
                    </b-form-group>
                </div>
            </div>
            <b-form-group class="mt-3">
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

vc
<script>
import { post } from '@/utils/api'

export default {
    name: 'UploadForm',
    data() {
        return {
            template: {
                types: [
                    {
                        text: 'Vine',
                        value: 'vine'
                    },
                    {
                        text: 'YouTube',
                        value: 'youtube'
                    },
                    {
                        text: 'Video',
                        value: 'video'
                    },
                    {
                        text: 'CSV',
                        value: 'csv',
                    }
                ]
            },
            form: {
                type: 'vine',
                title: '',
                description: '',
                url: '',
                author_url: '',
                video: null,
                csv: null
			},
			alerts: [
			],
			loading: false
        }
    },
    methods: {
        async onSubmit(e) {
			e.preventDefault()

			this.loading = true
			
            switch(this.form.type) {
                case 'vine':
					await this.uploadVine()
                    break
                case 'youtube':
					await this.uploadYoutube()
                    break
                case 'video':
					await this.uploadVideo()
                    break
                case 'csv':
					await this.uploadCsv()
                    break
                default:
                    break
			}
			
			this.loading = false
		},
		async uploadVine() {
			await post('upload/vine', {
				title: this.form.title,
				description: this.form.description,
				url: this.form.url,
				author_url: this.form.author_url
			})
			.then((json) => {
				this.alerts.push({
					type: 'success',
					message: json.message
				})
			})
			.catch((e) => {
				this.alerts.push({
					type: 'danger',
					message: e.message
				})
			})
		},
		async uploadYoutube() {
			await post('upload/youtube', {
				title: this.form.title,
				description: this.form.description,
				url: this.form.url,
				author_url: this.form.author_url
			})
			.then((json) => {
				this.alerts.push({
					type: 'success',
					message: json.message
				})
			})
			.catch((e) => {
				this.alerts.push({
					type: 'danger',
					message: e.message
				})
			})
		},
		async uploadVideo() {
			const reader = new FileReader()

			reader.onload = async () => {
				const file = btoa(unescape(encodeURIComponent(reader.result)))

				await post('upload/video', {
					title: this.form.title,
					description: this.form.description,
					url: this.form.url,
					author_url: this.form.author_url,
					file: file
				})
				.then((json) => {
					this.alerts.push({
						type: 'success',
						message: json.message
					})
				})
				.catch((e) => {
					this.alerts.push({
						type: 'danger',
						message: e.message
					})
				})
			}

			await reader.readAsBinaryString(this.form.video)
		},
		async uploadCsv() {
			const file = btoa(unescape(encodeURIComponent(await this.form.csv.text())))

			await post('upload/csv', {
				file: file
			})
			.then((json) => {
				this.alerts.push({
					type: 'success',
					message: json.message
				})
			})
			.catch((e) => {
				this.alerts.push({
					type: 'danger',
					message: e.message
				})
			})
		},
		alertDismissed(index) {
			this.alerts.splice(index, 1)
		}
	},
    mounted() {
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.form-card {
    background-color: $gray-700;
	position: relative;
	border: none;

    &::v-deep .text-muted {
        color: $gray-400 !important;
    }
}

.form-loading {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(0, 0, 0, .5);

	.spinner-border {
		width: 3rem;
		height: 3rem;
	}
}
</style>