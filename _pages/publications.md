---
title: "Publications"
permalink: /publications/
author_profile: true
---

<div class="pub-page">
  <header class="pub-header">
    <h1>Publications</h1>
  </header>

  <div class="pub-list">

    <!-- ZETA -->
    <article class="pub-item">
      <div class="pub-topline">
        <span class="pub-venue">CoRL 2026</span>
      </div>

      <h2>
        <a href="https://arxiv.org/abs/2609.02546" target="_blank" rel="noopener noreferrer">
          ZETA: A Controlled Study of Zero-Shot Cross-Embodiment VLA Transfer for Tabletop Manipulation
        </a>
      </h2>

      <p class="pub-authors">
        Mi Yan*, Wenhao Zhang*, Zhiqi Zhang*, Yu Peng*, Tangxinyu Wang*, Lingfei Zhai,
        Jiayi Su, Shengliang Deng, Lin Peng, Yaowei Liu, Yuxing Chen, Zhiyuan Wei,
        Jilong Wang, Jiayi Chen, Jiangran Lyu, Zhizheng Zhang†, He Wang†
      </p>

      <p class="pub-desc">
        A controlled study of cross-embodiment VLA transfer, separating strict zero-shot
        generalization to unseen robot embodiments from pretrain-exposed transfer, and
        analyzing the effects of state-action representations, embodiment diversity, 
        auxiliary co-training, and target-embodiment exposure.
      </p>

      <div class="pub-links">
        <a href="https://arxiv.org/abs/2609.02546" target="_blank" rel="noopener noreferrer">Paper ↗</a>
        <a href="https://theone2006.github.io/ZETA-Web" target="_blank" rel="noopener noreferrer">Project ↗</a>
      </div>
    </article>

    <!-- StereoVLA -->
    <article class="pub-item">
      <div class="pub-topline">
        <span class="pub-venue">RSS 2026</span>
      </div>

      <h2>
        <a href="https://arxiv.org/abs/2512.21970" target="_blank" rel="noopener noreferrer">
          StereoVLA: Enhancing Vision-Language-Action Models with Stereo Vision
        </a>
      </h2>

      <p class="pub-authors">
        Shengliang Deng*, Mi Yan*, Yixin Zheng*, Jiayi Su, Wenhao Zhang,
        Xiaoguang Zhao, Heming Cui, Zhizheng Zhang†, He Wang†
      </p>

      <p class="pub-desc">
        A stereo-vision VLA that jointly models semantic and geometric cues for
        fine-grained spatial perception, improving manipulation accuracy and
        robustness across large camera-pose variations.
      </p>

      <div class="pub-links">
        <a href="https://arxiv.org/abs/2512.21970" target="_blank" rel="noopener noreferrer">Paper ↗</a>
        <a href="https://shengliangd.github.io/StereoVLA-Webpage" target="_blank" rel="noopener noreferrer">Project ↗</a>
        <a href="https://github.com/shengliangd/StereoVLA" target="_blank" rel="noopener noreferrer">Code ↗</a>
      </div>
    </article>

    <!-- GraspVLA -->
    <article class="pub-item">
      <div class="pub-topline">
        <span class="pub-venue">CoRL 2025</span>
      </div>

      <h2>
        <a href="https://arxiv.org/abs/2505.03233" target="_blank" rel="noopener noreferrer">
          GraspVLA: a Grasping Foundation Model Pre-trained on Billion-scale Synthetic Action Data
        </a>
      </h2>

      <p class="pub-authors">
        Shengliang Deng*, Mi Yan*, Songlin Wei, Haixin Ma, Yuxin Yang, Jiayi Chen,
        Zhiqi Zhang, Taoyu Yang, Xuheng Zhang, Wenhao Zhang, Heming Cui, Zhizheng Zhang†, He Wang†
      </p>

      <p class="pub-desc">
        A grasping foundation model pretrained on billion-scale synthetic action data,
        enabling direct sim-to-real transfer, open-vocabulary generalization, and
        few-shot adaptation to downstream preferences.
      </p>

      <div class="pub-links">
        <a href="https://arxiv.org/abs/2505.03233" target="_blank" rel="noopener noreferrer">Paper ↗</a>
        <a href="https://pku-epic.github.io/GraspVLA-web" target="_blank" rel="noopener noreferrer">Project ↗</a>
        <a href="https://github.com/PKU-EPIC/GraspVLA" target="_blank" rel="noopener noreferrer">Code ↗</a>
      </div>
    </article>

  </div>

  <p class="pub-footnote">* Equal contribution &nbsp;&nbsp; † Corresponding author</p>
</div>

<style>
/* Minimal publication list — scoped to this page only. */
.pub-page {
  --ink: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --blue: #3159a7;
  max-width: 900px;
  margin: 0 auto;
  color: var(--ink);
}

.pub-header {
  margin: 4px 0 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.pub-header h1 {
  margin: 0 0 8px;
  font-size: 2rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 720;
  color: #111827;
}
.pub-header p {
  margin: 0;
  color: var(--muted);
  font-size: .94rem;
  line-height: 1.65;
}

.pub-list {
  display: grid;
  gap: 18px;
}

.pub-item {
  padding: 23px 25px 22px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.pub-item:hover {
  border-color: #cfd6e2;
  box-shadow: 0 5px 18px rgba(31, 41, 55, .055);
}

.pub-topline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 11px;
}
.pub-venue {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  background: #eef3ff;
  color: #3159a7;
  font-size: .68rem;
  font-weight: 750;
  letter-spacing: .02em;
}
.pub-area {
  color: #8a93a2;
  font-size: .72rem;
  font-weight: 600;
}

.pub-item h2 {
  margin: 0 0 9px;
  font-size: 1.23rem;
  line-height: 1.38;
  letter-spacing: -0.018em;
  font-weight: 700;
}
.pub-item h2 a {
  color: #172033 !important;
  text-decoration: none !important;
}
.pub-item h2 a:hover {
  color: var(--blue) !important;
}

.pub-authors {
  margin: 0 0 11px;
  color: #5f6877;
  font-size: .82rem;
  line-height: 1.58;
}

.pub-desc {
  max-width: 790px;
  margin: 0 0 15px;
  color: #667085;
  font-size: .84rem;
  line-height: 1.66;
}

.pub-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.pub-links a {
  color: #35558f !important;
  text-decoration: none !important;
  font-size: .75rem;
  font-weight: 680;
}
.pub-links a:hover {
  text-decoration: underline !important;
  text-underline-offset: 3px;
}

.pub-footnote {
  margin: 17px 2px 0;
  color: #949baa;
  font-size: .7rem;
}

@media (max-width: 600px) {
  .pub-header { margin-bottom: 22px; }
  .pub-header h1 { font-size: 1.75rem; }
  .pub-item { padding: 19px 18px 18px; border-radius: 10px; }
  .pub-item h2 { font-size: 1.08rem; }
}
</style>