#!/bin/bash
STATE=`mktemp -d`
touch $STATE/src
touch $STATE/build

function sync-containers {
	docker cp . "tournus-main-1:/tournus"
}

function at-least-5GB-free-space {
	[ $(df --output=avail / | tail -n1) -gt 5000000 ] || (echo "Not enough free space" && exit 1)
}

function set-state {
	find . -type f -not -path '*/\.*' -printf "%T+\t%M\t%p\n" | md5sum > $STATE/$1
}

function diff-state {
	cmp -s $STATE/$1 $STATE/$2 || return 0
	return 1
}

function setup_pre_commit_hook {
	if [ -f ".git/hooks/pre-commit" ]; then
        return 0
    fi

	ls .git/hooks/pre-commit.sample
	echo "#!/bin/sh" > .git/hooks/pre-commit
	echo "docker compose down -v -t 1" >> .git/hooks/pre-commit
	echo "docker compose up -d --build" >> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
}

function rebuild {
	set -e
	echo ""
	echo "╭────────────────────────────╮"
	echo "│ Rebuilding containers..    │ "
	echo "│ press ctrl-c again to stop │ "
	echo "╰────────────────────────────╯"
	docker compose down -v --remove-orphans -t 1
	docker compose up -d --build
	print_startup
	set +e
}

function print_startup {
	echo ""
	echo "╭──────────────────────────────────────────────────╮"
	echo "│ Tournus: http://localhost:8080                   │"
	echo "│                                                  │"
	echo "│ Live feedback:                                   │"
	echo "│   docker compose logs -f --no-log-prefix tournus │"
	echo "╰──────────────────────────────────────────────────╯"
}

set -e
setup_pre_commit_hook
at-least-5GB-free-space
docker compose up -d --build
trap rebuild SIGINT
print_startup
set +e

while true
do 
	set-state src

	if diff-state src build; then
		set-state build && sync-containers
	fi

	sleep 1
done