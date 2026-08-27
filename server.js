const express = require("express");
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const users = new Map();

app.use(express.json());

app.use(cookieSession({
    name: "jhonny_session",
    keys: [
        process.env.SESSION_SECRET || "jhonny-demo-secret"
    ],
    httpOnly: true,
    sameSite: "lax",
    secure: false
}));

app.use(express.static(path.join(__dirname, "public")));

function getUser(req) {
    if (!req.session.user) return null;
    return users.get(req.session.user) || null;
}

app.post("/api/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "Please complete all fields."
        });
    }

    if (users.has(email)) {
        return res.status(409).json({
            error: "Account already exists."
        });
    }

    const passwordHash =
        await bcrypt.hash(password, 12);

    const user = {
        username,
        email,
        passwordHash,
        points: 1000,
        games: 0
    };

    users.set(email, user);

    req.session.user = email;

    res.json({
        success: true,
        user: publicUser(user)
    });
});

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    const user = users.get(email);

    if (!user) {
        return res.status(401).json({
            error: "Invalid login."
        });
    }

    const valid =
        await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
        return res.status(401).json({
            error: "Invalid login."
        });
    }

    req.session.user = email;

    res.json({
        success: true,
        user: publicUser(user)
    });
});

app.post("/api/logout", (req, res) => {

    req.session = null;

    res.json({
        success: true
    });
});

app.get("/api/me", (req, res) => {

    const user = getUser(req);

    res.json({
        loggedIn: !!user,
        user: user ? publicUser(user) : null
    });
});

app.post("/api/game-result", (req, res) => {

    const user = getUser(req);

    if (!user) {
        return res.status(401).json({
            error: "Login required."
        });
    }

    const points =
        Math.max(0, Math.min(500, Number(req.body.points) || 0));

    user.points += points;
    user.games++;

    res.json({
        success: true,
        user: publicUser(user)
    });
});

app.get("/api/leaderboard", (req, res) => {

    const leaderboard =
        [...users.values()]
            .sort((a, b) => b.points - a.points)
            .slice(0, 10)
            .map((user, index) => ({
                rank: index + 1,
                username: user.username,
                points: user.points,
                games: user.games
            }));

    res.json(leaderboard);
});

function publicUser(user) {

    return {
        username: user.username,
        email: user.email,
        points: user.points,
        games: user.games
    };
}

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

app.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("================================");
    console.log(" JHONNY ARCADE ONLINE");
    console.log("================================");
    console.log(`http://localhost:${PORT}`);
    console.log("");
});
