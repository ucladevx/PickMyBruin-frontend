# A guide to contributing

## Obtain a fresh copy of the remote repository
Before touching any code on your local machine, always make sure it is up to date with the remote version (on the server)  
This will elminate any pains later. Read on to see how to do that

1. `cd` to your local copy of the repository
2. If you are on a different branch then master, run `git checkout master`
3. Run `git pull`. This command will download all the files from the server locally  

## Switch to a **new branch** to do your development

1. Run `git checkout -b name--feature-name`. This command will create a new branch based off of the master branch (i.e. your new branch will look exactly like the master branch, but is separate from it)
2. Make sure to commit major chunks of code to your branch often. Do this by first running `git add .` This will stage _all files_. If you know which files exactly you want to commit, run `git add <file_name>`
3. Run `git commit -m "your message"` This will create a new commit **on whatever branch you are currently working on** (to see what branch you are on, run `git branch`

## Push your changes to the remote server

1. Push the commits on your branch to the remote server by running `git push`. Git will prompt you to set the upstream branch if you haven't already, so if that command doesn't work, just run whatever command git tells you to next  

Once you are done developing the feature for this branch, you are ready to submit a Pull Request (PR)

## Create a PR
Navigate to github.com after pushing your commits on your branch. You should see an icon like this  

![Create Pr](https://raw.githubusercontent.com/ucladevx/PickMyBruin-frontend/master/RepoImages/create_pr.png)  

Click the green button. You will be navigated to a screen like this  

![Submit Pr](https://raw.githubusercontent.com/ucladevx/PickMyBruin-frontend/master/RepoImages/submit_pr.png)  

Give your PR a title and give it a good description so that whoever reviews your PR doesn't have to think too hard about what you're modifying in it. If there is any code you think is confusing, make sure to explain it. Click the green button when you're done

## Congrats!
You've created a PR. Someone on your team will review it and merge to master. Once it gets merged, make sure to checkout to master and run `git pull` again to get all the changes!


