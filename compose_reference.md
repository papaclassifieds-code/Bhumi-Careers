# Jetpack Compose Implementation Guide

This project provides a fully functional web-based prototype mimicking Material Design 3. Below are the structural guidelines and Jetpack Compose component breakdowns for migrating this app directly to a native Android codebase.

## Suggested API Structure (RESTful)

For the backend (Node.js/Express, Spring Boot, or Firebase), a simple cohesive API structure:

```json
Endpoints:
GET /api/v1/jobs
Response:
[
  {
    "id": "j1",
    "title": "Senior Android Developer",
    "location": "Bangalore",
    "experience": "4-6 Years",
    "shortDescription": "...",
    "fullDescription": "...",
    "requirements": ["..."],
    "salary": "₹18L - ₹24L PA",
    "postedDate": "2023-11-20T10:00:00Z"
  }
]

GET /api/v1/jobs/{id}

POST /api/v1/applications
Headers: Content-Type: multipart/form-data
Body:
- jobId (text)
- fullName (text)
- email (text)
- phone (text)
- city (text)
- experience (text)
- resume (file)

Response:
{
  "success": true,
  "applicationId": "BGS-82736",
  "message": "Application submitted successfully"
}
```

## Jetpack Compose UI Flow & Component Breakdown

### 1. Theming (ui/theme/Theme.kt)
Use `MaterialTheme` utilizing the dynamic colors or the specific brand colors:
```kotlin
val PrimaryGreen = Color(0xFF386A20)
val OnPrimary = Color(0xFFFFFFFF)
val PrimaryContainer = Color(0xFFB7F397)
val OnPrimaryContainer = Color(0xFF042100)

private val LightColors = lightColorScheme(
    primary = PrimaryGreen,
    onPrimary = OnPrimary,
    primaryContainer = PrimaryContainer,
    onPrimaryContainer = OnPrimaryContainer,
    surface = Color(0xFFFDFDF5),
    onSurface = Color(0xFF1A1C18)
)
```

### 2. Navigation Flow
Use `androidx.navigation.compose.NavHost`:
```kotlin
val navController = rememberNavController()
NavHost(navController = navController, startDestination = "home") {
    composable("home") { HomeScreen(navController) }
    composable("details/{jobId}") { backStackEntry -> 
        JobDetailsScreen(
            navController, 
            backStackEntry.arguments?.getString("jobId")
        ) 
    }
    composable("apply/{jobId}") { ... }
    composable("success/{appId}") { ... }
}
```

### 3. Home Screen (Job Listings)
Use a `Scaffold` with `TopAppBar` and `LazyColumn`.

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavController, viewModel: JobsViewModel = hiltViewModel()) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Careers") }) }
    ) { padding ->
        Column(modifier = Modifier.padding(padding)) {
            // Search Bar
            OutlinedTextField(
                value = viewModel.searchQuery.value,
                onValueChange = { viewModel.onSearchChanged(it) },
                modifier = Modifier.fillMaxWidth().padding(16.dp),
                leadingIcon = { Icon(Icons.Default.Search, "Search") },
                shape = RoundedCornerShape(28.dp)
            )

            // Job List
            LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(viewModel.jobs.value) { job ->
                    JobCard(job) { navController.navigate("details/${job.id}") }
                }
            }
        }
    }
}

@Composable
fun JobCard(job: Job, onClick: () -> Unit) {
    ElevatedCard(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(text = job.title, style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.LocationOn, "Location", modifier = Modifier.size(16.dp))
                Text(job.location, style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}
```

### 4. Apply Form & File Upload
To handle file upload in Compose, use the `rememberLauncherForActivityResult`.

```kotlin
@Composable
fun ResumeUploadField(onFileSelected: (Uri?) -> Unit) {
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        onFileSelected(uri)
    }

    OutlinedCard(
        onClick = { launcher.launch("application/pdf") },
        modifier = Modifier.fillMaxWidth().height(120.dp).border(1.dp, Color.Gray, RoundedCornerShape(12.dp))
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Icon(Icons.Default.Upload, "Upload Resume")
            Text("Tap to upload PDF or DOCX")
        }
    }
}
```

## Permissions for Android (`AndroidManifest.xml`)
As specified in requirements, only request what is necessary.
```xml
<uses-permission android:name="android.permission.INTERNET" />
<!-- READ_EXTERNAL_STORAGE is ONLY needed for older Android versions to pick files. -->
<!-- With the Storage Access Framework (GetContent contract used above), NO storage permission is needed! -->
```

## Privacy Policy Integration
Don't forget to include the privacy policy link in the UI and also link it via the Google Play Console under the App Content section, specifically stating that email/phone are collected exclusively for recruitment processing and are not shared with third parties.
