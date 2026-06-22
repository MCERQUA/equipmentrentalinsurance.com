#!/usr/bin/env bash
# Generate all images for equipmentrentalinsurance.com via HuggingFace FLUX.1-schnell
# Robust: retries up to 4 times, verifies each is a valid image >= 30KB
set -uo pipefail

OUT="/workspace/Websites/equipmentrentalinsurance.com/public/images"
mkdir -p "$OUT"

# gen <fname> <prompt> [steps] [width] [height]
gen() {
  local fname="$1"; shift
  local prompt="$1"; shift
  local steps="${1:-4}"; shift || true
  local w="${1:-1024}"; shift || true
  local h="${1:-1024}"; shift || true
  local dest="$OUT/$fname"
  local attempt=0
  while [ $attempt -lt 4 ]; do
    attempt=$((attempt+1))
    echo "[$fname] attempt $attempt (steps=$steps ${w}x${h})..."
    curl -s --max-time 200 \
      https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell \
      -H "Authorization: Bearer $HF_TOKEN" \
      -H "Content-Type: application/json" \
      -d "$(jq -nc --arg p "$prompt" --argjson s "$steps" --argjson w "$w" --argjson h "$h" '{inputs:$p, parameters:{num_inference_steps:$s, width:$w, height:$h}}')" \
      -o "$dest"
    local ftype; ftype=$(file -b "$dest" 2>/dev/null)
    local sz; sz=$(stat -c%s "$dest" 2>/dev/null || echo 0)
    if echo "$ftype" | grep -qiE "image|jpeg|png" && [ "$sz" -ge 30000 ]; then
      echo "[$fname] OK ($sz bytes, $ftype)"
      return 0
    fi
    echo "[$fname] FAIL (size=$sz, type=$ftype)"
    if echo "$ftype" | grep -qi "text\|json"; then head -c 200 "$dest"; echo ""; fi
    sleep 4
  done
  echo "[$fname] GAVE UP after $attempt attempts"
  return 1
}

# === 12 images — EQUIPMENT RENTAL INSURANCE ===

gen "hero.jpg" \
  "Photorealistic cinematic wide shot of a large equipment rental yard at golden-hour dawn: rows of yellow construction equipment — excavators, skid steers, a boom lift, and flatbed trailers — staged and ready for delivery, a clean modern rental facility in the background, warm morning light, dust in the air. Bright professional industrial photography, bold natural colors, high-end commercial photography, no text, no watermark" 4

gen "coverage.jpg" \
  "Photorealistic elevated aerial view of a large modern equipment rental yard: organized rows of excavators, loaders, scissor lifts, generators, and enclosed trailers, delivery trucks and a flatbed in the loading area, blue sky with soft clouds. Clean professional industrial photography, no text" 4

gen "about.jpg" \
  "Photorealistic authentic portrait of a friendly equipment rental yard owner wearing a polo shirt and cap standing in front of a row of yellow construction equipment and a boom lift, warm natural light, trustworthy genuine expression, shallow depth of field, commercial photography, no text" 4

gen "og-image.jpg" \
  "Photorealistic wide cinematic landscape of an equipment rental yard at sunrise: rows of yellow excavators and skid steers, a boom lift and flatbed trailers, a clean modern facility, blue sky, warm golden light. Premium industrial commercial photography, clean and inviting, no text, no watermark" 4 1216 640

gen "inland-marine.jpg" \
  "Photorealistic photo of a large yellow crawler excavator and a skid steer on a construction job site being operated by a contractor, dirt and grade work, warm afternoon light, shallow depth of field, professional construction photography, no text" 4

gen "general-liability.jpg" \
  "Photorealistic photo of an equipment rental delivery: a flatbed truck with a boom lift unloading at a commercial construction site, workers in hi-vis vests and hard hats, blue sky, professional commercial photography, no text" 4

gen "equipment-breakdown.jpg" \
  "Photorealistic photo of a mechanic in coveralls servicing the engine bay and hydraulic system of a large yellow excavator inside a clean equipment rental service bay, tools and grease guns, bright industrial lighting, professional commercial photography, no text" 4

gen "rented-to-others.jpg" \
  "Photorealistic photo of a contractor signing a rental agreement at an equipment rental yard counter with a scissor lift and skid steer visible through the large bay door behind, hi-vis vest and hard hat, warm natural light, professional commercial photography, no text" 4

gen "commercial-auto.jpg" \
  "Photorealistic photo of a polished heavy-duty flatbed delivery truck and a lowboy trailer loaded with a tracked excavator parked at an equipment rental yard loading bay, blue sky, clean vehicle, professional commercial automotive photography, no text" 4

gen "workers-compensation.jpg" \
  "Photorealistic photo of equipment rental yard workers in hi-vis vests and hard hats safely loading a skid steer onto a flatbed trailer, bright professional industrial photography, warm natural light, no text" 4

gen "umbrella.jpg" \
  "Photorealistic photo of a wide lineup of heavy rental equipment — multiple excavators, wheel loaders, and boom lifts — staged at a large rental yard under a dramatic sky, conveying scale and value, professional commercial industrial photography, no text" 4

gen "cta.jpg" \
  "Photorealistic photo of an equipment rental delivery truck pulling out of a rental yard gate at dawn with excavators and boom lifts staged behind, warm golden light, sense of motion and a fleet heading to work, professional commercial photography, no text" 4

echo "=== ALL IMAGE GENERATION ATTEMPTS COMPLETE ==="
ls -la "$OUT"
