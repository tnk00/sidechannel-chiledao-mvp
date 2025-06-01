 <template>
  <div class="container">
    <footer class="py-6 py-8-tablet border-top">
      <div class="columns">
        <div class="column is-8-tablet mb-6 mb-0-tablet">
          <div class="columns">
            <div class="column is-narrow-mobile mb-6 mb-0-mobile">
              <div class="pr-5">
                <h4 class="title mb-3">Site</h4>
                <ul class="list">
                  <li class="list-item"><NuxtLink to="/" class="list-link">Workstreams</NuxtLink></li> 
                  <li class="list-item"><NuxtLink to="/tasks" class="list-link">Tasks</NuxtLink></li>
                  <li class="list-item"><NuxtLink to="/payouts" class="list-link">Payouts</NuxtLink></li>
                  <li class="list-item"><NuxtLink to="/organization" class="list-link">Organization</NuxtLink></li>
                </ul>   
              </div>             
            </div>
            <div class="column is-narrow-mobile">
              <div class="pr-5">
                <h4 class="title mb-3">Resources</h4>
                <ul class="list">
                  <li class="list-item"><a href="#" class="list-link">FAQ</a></li>
                </ul>  
              </div>              
            </div>
          </div>
        </div>
        <div class="column is-4-tablet">
          <p>AI-Powered Task Evaluation for Fair Rewards.</p>
        </div>
      </div>
    </footer>
  </div>
 </template>